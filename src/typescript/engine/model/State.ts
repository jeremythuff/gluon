import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import * as THREE from "three";

import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";

import Mode from "./Mode";

import ControlProfile from "../util/io/ControlProfile";
import ControlRunner from "../util/io/ControlRunner";

import { Controllable } from "../model/interface/Controllable";

/**
 * The State class acts as the primary organizing entiry for your game. 
 * States are registered and instantiated with the your game instance through the
 * use of the [[GameState]] decorator. Any class which both extends State and is decorated
 * with [[GameState]] will automatically be available for you in your game instance.
 * */
export default class State extends AbstractRenderCycle implements Controllable {

	private name: string;
	private framesPerSecond: number;

	private modes: Mode[];
	private activeModes: Mode[];

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;

	private sceneMesh: THREE.Object3D;
	private sceneCamera: THREE.Camera;

	private controlRunner: ControlRunner;
	private controlProfiles: ControlProfile<Controllable>[];

	constructor() {
		super();
		this.modes = [];
		this.activeModes = [];
		this.controlProfiles = [];

		this.scene = new THREE.Scene();
		this.sceneMesh = new THREE.Object3D();

	}

	protected _runInit(): Observable<{}[]> {
		let combinedObs = Observable.create();
		return combinedObs;
	}

	protected _runLoad(): Observable<{}[]> {
		let combinedObs = Observable.create();
		return combinedObs;
	}

	protected _runUpdate(delta: number): void {
		this.activeModes.forEach(mode => {
			mode.startUpdate(delta);
		});
	};

	protected _runRender(delta: number): void {
		this.activeModes.forEach(mode => {
			mode.startRender(delta);
		});
	};

	protected _runPause(): void {
		this.activeModes.forEach(mode => {
			mode.startPause();
		});
	};

	protected _runUnpause(): void {
		this.activeModes.forEach(mode => {
			mode.startUnpause();
		});
	};

	protected _runUnload(): Observable<{}[]> {
		let combinedObs = Observable.create();
		combinedObs = Observable.forkJoin(this.deActivateAllModes(), combinedObs);
		return combinedObs;
	}

	protected _runDestroy(): Observable<{}[]> {
		let combinedObs = Observable.create();
		return combinedObs;
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}

	getFramesPerSecond(): number {
		return this.framesPerSecond;
	}

	setFramesPerSecond(framesPerSecond: number): void {
		this.framesPerSecond = framesPerSecond;
	}

	setModes(modes: Mode[]) {
		this.modes = modes;
	}

	getModes(): Mode[] {
		return this.modes;
	}

	addMode(mode: Mode): void {
		this.modes.push(mode);
	}

	removeMode(mode: Mode): void {
		this.modes.splice(this.modes.indexOf(mode), 1);
	}

	getModeByName(name: string): Mode {
		let foundMode = null;
		this.modes.some(mode => {
			const p = mode.getName() === name;
			if (p) foundMode = mode;
			return p;
		});
		return foundMode;
	}

	getActiveModes() {
		return this.activeModes;
	}

	activateMode(mode: Mode): void {
		mode.startInit()
			.subscribe(null, null, () => {
				mode.getControlProfiles().forEach(cp => {
					this.addControlProfile(cp);
				});
				this.activeModes.push(mode);
			});
	}

	avtivateAllModes(mode: Mode): void {
		this.modes.forEach(mode => {
			this.activateMode(mode);
		});
	}

	deActivateMode(mode: Mode): Observable<{}[]> {
		const deactivateObs: Observable<{}[]> = mode.startUnload()
		deactivateObs
			.subscribe(null, null, () => {
				mode.getControlProfiles().forEach(cp => {
					this.removeControlProfile(cp);
				});
				this.activeModes.splice(this.activeModes.indexOf(mode), 1);
			});
		return deactivateObs;		
	}

	deActivateAllModes(): Observable<{}[]> {
		let obsArr: Observable<{}[]>[] = []; 

		for(let i=this.activeModes.length-1; i>=0; i--) {
			let mode = this.activeModes[i];
			obsArr.push(this.deActivateMode(mode));
		}

		return Observable.merge(...obsArr);
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

	getRenderer(): THREE.WebGLRenderer {
		return this.renderer;
	}

	setRenderer(renderer: THREE.WebGLRenderer): void {
		this.renderer = renderer;
	}

	getScene(): THREE.Scene {
		return this.scene;
	}

	getSeceneCamera(): THREE.Camera {
		return this.sceneCamera;
	}

	setSeceneCamera(camera: THREE.Camera) :void {
		this.sceneCamera = camera;
	}

	getSceneMesh(): THREE.Object3D {
		return this.sceneMesh;
	}

}