import {RenderCycle} from "../interface/RenderCycle";
import {PhaseCB} from "../interface/PhaseCB";
import {RenderPhase} from "../../enum/RenderPhase";

import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export abstract class AbstractRenderCycle implements RenderCycle {

	protected phase : RenderPhase = RenderPhase.OFF;

	protected initCBs :PhaseCB[];
	protected loadCBs :PhaseCB[];
	protected updateCBs :PhaseCB[];
	protected renderCBs :PhaseCB[];
	protected pauseCBs :PhaseCB[];
	protected unPauseCBs :PhaseCB[];
	protected unloadCBs :PhaseCB[];
	protected destroyCBs :PhaseCB[];

	constructor() {
		this.initCBs = [];
    	this.loadCBs = [];
    	this.updateCBs = [];
    	this.renderCBs = [];
    	this.pauseCBs = [];
    	this.unPauseCBs = [];
    	this.unloadCBs = [];
    	this.destroyCBs = [];
	}

	protected abstract _runInit() :Observable<{}[]>;
	public runInit() :Observable<{}[]> {
		this.setPhase(RenderPhase.INITIALIZING);

		const _initObs = this._runInit();
		const initObs = this.runPhaseCBs(this.initCBs);

		return Observable.forkJoin(initObs, _initObs);
	}

	public init(initCB :PhaseCB) :void {
		this.initCBs.push(initCB);
	}

	protected abstract _runLoad() :Observable<{}[]>;
	public runLoad() :Observable<{}[]> {
		this.setPhase(RenderPhase.LOADING);
		
		const _loadObs = this._runLoad();
		const loadObs = this.runPhaseCBs(this.loadCBs);

		return Observable.forkJoin(loadObs, _loadObs);
	}

	public load(cb :PhaseCB) :void {
		this.loadCBs.push(cb);
	}

	protected abstract _RunUpdate(delta :number) :void;
	public runUpdate(delta :number) :void {
		this.setPhase(RenderPhase.UPDATING);
		this.updateCBs.forEach(cb=>{
			cb(delta);
		});
		this._RunUpdate(delta);
	}

	public update(cb :PhaseCB) :void {
		this.updateCBs.push(cb);
	}

	protected abstract _RunRender(delta :number) :void;
	public runRender(delta :number) :void {
		this.setPhase(RenderPhase.RENDERING);
		this.renderCBs.forEach(cb=>{
			cb(delta);
		});
		this._RunRender(delta);
	}

	public render(cb :PhaseCB) :void {
		this.renderCBs.push(cb);
	}

	protected abstract _RunPause() :void;
	public runPause() :void {
		this.setPhase(RenderPhase.PAUSED);
		this.pauseCBs.forEach(cb=>{
			cb();
		});
		this._RunPause();
	};

	public pause(cb :PhaseCB) {
		this.pauseCBs.push(cb);
	}

	protected abstract _RunUnPause() :void;
	public runUnPause() :void {
		this.setPhase(RenderPhase.READY);
		this.unPauseCBs.forEach(cb=>{
			cb();
		});
		this._RunUnPause();
	};

	public unPause(cb :PhaseCB) : void {
		this.unPauseCBs.push(cb);
	}

	protected abstract _runUnLoad() :Observable<{}[]>;
	public runUnload() :Observable<{}[]> {
		this.setPhase(RenderPhase.UNLOADING);

		const _unLoadObs = this._runUnLoad();
		const unLoadObs = this.runPhaseCBs(this.unloadCBs);

		return Observable.forkJoin(unLoadObs, _unLoadObs);
	}

	public unload(cb :PhaseCB) :void {
		this.unloadCBs.push(cb);
	}
	
	protected abstract _runDestroy() :Observable<{}[]>;
	public runDestroy() :Observable<{}[]>  {
		this.setPhase(RenderPhase.DESTROYING);

		const _loadObs = this._runDestroy();
		const loadObs = this.runPhaseCBs(this.destroyCBs);

		return Observable.forkJoin(loadObs, _loadObs);
	}

	public destroy(cb :PhaseCB) :void {
		this.destroyCBs.push(cb);
	}

	phaseIs(phase:RenderPhase) :boolean {
		return phase===this.phase || phase === Math.floor(this.phase);
	}

	getPhase() :RenderPhase {
		return this.phase;
	}

	setPhase(phase :RenderPhase) :void {
		console.log(phase);
		this.phase = phase;
	}

	private runPhaseCBs(cbs :PhaseCB[]) :Observable<{}[]> {
		return Observable.create(observer => {	
		    cbs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});
	}

}