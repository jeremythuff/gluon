import * as THREE from "three";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";

import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import ControlRunner from "../util/io/ControlRunner";
import ControlProfile from "../util/io/ControlProfile";
import State from "./State";

import { RenderPhase } from "../enum/RenderPhase";

import { Controllable } from "../model/interface/Controllable";

import FileLoader from "../util/loaders/FileLoader"

/**
 * The Game class is the central class to all Gluon games. By extending
 * this class into you game main glass, and decorating it with the [[GameMain]]
 * decorator, it will be the main entry point for your game.
 */
export default class Game extends AbstractRenderCycle implements Controllable {

	private name: string;

	private renderer: THREE.WebGLRenderer;

	private framesPerSecond: number;
	private initialStateName: string;
	private activeState: State;
	private states: State[];
	private controlRunner: ControlRunner;

	private controlProfiles: ControlProfile<Controllable>[];

	constructor(name?: string) {
		super();
		if (name) this.setName(name);
		this.states = [];
		this.controlProfiles = [];
		this.renderer = new THREE.WebGLRenderer();
		this.controlRunner = new ControlRunner();
	}

	protected _runInit(): Observable<{}[]> {

		this.activeState = this.getState(this.initialStateName);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		document.body.insertBefore(this.renderer.domElement, document.body.firstChild);

		const $windowResize = Observable.fromEvent(window, 'resize').debounceTime(100);

		$windowResize.subscribe(test => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		});

		return Observable.forkJoin(this.activeState.startInit());
	}

	protected _runLoad(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runUpdate(delta: number): void {
		if (this.activeState.phaseIs(RenderPhase.READY))
			this.activeState.startUpdate(delta);

		const cps = this.activeState.phaseIs(RenderPhase.READY) ? this.activeState.getControlProfiles().concat(this.getControlProfiles()) : this.getControlProfiles();

		this.controlRunner._runCBs(cps, delta);

	};

	protected _runRender(delta: number): void {
		if (this.activeState.phaseIs(RenderPhase.READY))
			this.activeState.startRender(delta);
	};

	protected _runPause(): void {
		this.activeState.startPause();
	};

	protected _runUnpause(): void {
		this.activeState.startUnpause();
	};

	protected _runUnload(): Observable<{}[]> {
		return Observable.forkJoin(this.activeState.startUnload());
	}

	protected _runDestroy(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}

	getRenderer(): THREE.WebGLRenderer {
		return this.renderer;
	}

	getInitialStateName(): string {
		return this.initialStateName;
	}

	setInitialStateName(stateName: string): void {
		this.initialStateName = stateName;
	}

	getActiveState(): State {
		return this.activeState;
	}

	setActiveState(state: State): void {

		if (!state) {
			console.error("State undefined");
			return;
		}

		if (this.activeState) {
			this.activeState.startUnload()
				.take(1)
				.subscribe(null, null, () => {
					this.activeState = state;
					this.activeState.startInit();
				});
		} else {
			this.activeState = state;
			this.activeState.startInit();
		}

	}

	getFramesPerSecond(): number {
		let frameRate = this.framesPerSecond;
		if (this.getActiveState()) {
			frameRate = this.getActiveState().getFramesPerSecond()
				? this.getActiveState().getFramesPerSecond()
				: this.framesPerSecond;
		}
		return frameRate;
	}

	setFramesPerSecond(framesPerSecond: number): void {
		this.framesPerSecond = framesPerSecond;
	}

	getState(name: string): State {
		let foundState = null;

		this.states.some((state: State) => {
			let pred = state.getName() === name;

			if (pred) foundState = state;
			return pred;
		});

		if (!foundState) console.error(`No state: ${name}`);

		return foundState;
	}

	addState(state: State): State {
		state.setRenderer(this.getRenderer());
		this.states.push(state);
		return state;
	}

	setControlProfiles(controlProfiles: ControlProfile<Controllable>[]): void {
		this.controlProfiles = controlProfiles;
	}

	getControlProfiles(): ControlProfile<Controllable>[] {
		return this.controlProfiles;
	}

	addControlProfile(controlProfile: ControlProfile<Controllable>): void {
		this.getControlProfiles().push(controlProfile);
	}

	removeControlProfile(controlProfile: ControlProfile<Controllable>): void {
		const controlProfiles = this.getControlProfiles();
		controlProfiles.splice(controlProfiles.indexOf(controlProfile), 1);
	}

}