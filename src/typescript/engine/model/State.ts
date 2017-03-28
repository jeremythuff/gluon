import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";
import * as THREE from "three";

import {AbstractRenderCycle} from "./abstracts/AbstractRenderCycle";
import Mode from "./Mode";

import Controls from "../util/io/Controls";

/**
 * The State class acts as the primary organizing entiry for your game. 
 * States are registered and instantiated with the your game instance through the
 * use of the [[GameState]] decorator. Any class which both extends State and is decorated
 * with [[GameState]] will automatically be available for you in your game instance.
 * */
export default class State extends AbstractRenderCycle {

	private name : string;
	private framesPerSecond: number;

	private modes :Mode[];
	private activeModes :Mode[];

	private renderer :THREE.WebGLRenderer;
	private scene :THREE.Scene;

	public controls :Controls;

	constructor() {
		super();
    	this.modes = [];
    	this.activeModes =[];
    	this.scene = new THREE.Scene();
    	this.controls = new Controls();
    }

   protected  _runInit() :Observable<{}[]> {
		let combinedObs = Observable.create();
		return combinedObs;
	}

	protected _runLoad() :Observable<{}[]> {
		let combinedObs = Observable.create();
		return combinedObs;
	}

	protected _runUpdate(delta :number) :void {
		this.activeModes.forEach(mode=>{
			mode.runUpdate(delta);
		});
	};

	protected _runRender(delta :number) :void {
		this.activeModes.forEach(mode=>{
			mode.runRender(delta);
		});
	};

	protected _runPause() :void {
		this.activeModes.forEach(mode=>{
			mode.runPause();
		});
	};

	protected _runUnPause() :void {
		this.activeModes.forEach(mode=>{
			mode.runUnPause();
		});
	};

	protected _runUnLoad() :Observable<{}[]> {
		let combinedObs = Observable.create();

		this.activeModes.forEach(mode=>{
			combinedObs = Observable.forkJoin(mode.runUnload(),combinedObs);
		});

		return combinedObs;
	}

	protected _runDestroy() :Observable<{}[]>  {
		let combinedObs = Observable.create();

		this.activeModes.forEach(mode=>{
			combinedObs = Observable.forkJoin(mode.runDestroy(),combinedObs);
		});

		return combinedObs;
	}

	getName() : string {
		return this.name;
	}

	setName(name :string) : void {
		this.name = name;
	}

	getFramesPerSecond() : number {
		return this.framesPerSecond;
	}

	setFramesPerSecond(framesPerSecond :number) : void {
		this.framesPerSecond = framesPerSecond;
	}

	setModes(modes :Mode[]) {
		this.modes = modes;
	}

	getModes() :Mode[] {
		return this.modes;
	}

	getModeByName(name :string) :Mode {
		let foundMode = null;
		this.modes.some(mode=>{
			const p = mode.getName() === name;
			if(p) foundMode = mode;
			return p;
		});
		return foundMode;
	}

	activateMode(mode :Mode) :void {
		mode.runInit()
			.take(1)
			.subscribe(null,null,()=>{
				this.activeModes.push(mode);
			});
	}

	avtivateAllModes(mode :Mode) :void {
		this.modes.forEach(mode=>{
			this.activateMode(mode);
		});
	}

	deActivateMode(mode :Mode) :void {
		mode.runUnload()
			.take(1)
			.subscribe(null,null,()=>{
				this.activeModes.splice(this.activeModes.indexOf(mode),1);		
			}).unsubscribe();
	}

	deActivateAllMode(mode :Mode) :void {
		this.activeModes.forEach(mode=>{
			this.deActivateMode(mode);
		});
	}

}