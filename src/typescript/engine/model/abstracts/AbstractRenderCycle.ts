import { RenderCycle } from "../interface/RenderCycle";
import { PhaseCB } from "../interface/PhaseCB";
import { RenderPhase } from "../../enum/RenderPhase";

import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";

import { AbstractControllable } from "./AbstractControllable";

export abstract class AbstractRenderCycle extends AbstractControllable implements RenderCycle {

	protected phase: RenderPhase = RenderPhase.OFF;

	protected initCBs: PhaseCB[];
	protected loadCBs: PhaseCB[];
	protected updateCBs: PhaseCB[];
	protected renderCBs: PhaseCB[];
	protected pauseCBs: PhaseCB[];
	protected unPauseCBs: PhaseCB[];
	protected unloadCBs: PhaseCB[];
	protected destroyCBs: PhaseCB[];

	constructor() {
		super();
		this.initCBs = [];
		this.loadCBs = [];
		this.updateCBs = [];
		this.renderCBs = [];
		this.pauseCBs = [];
		this.unPauseCBs = [];
		this.unloadCBs = [];
		this.destroyCBs = [];
	}

	protected abstract _runInit(): Observable<{}[]>;
	public runInit(): Observable<{}[]> {
		this.setPhase(RenderPhase.INITIALIZING);

		const _initObs = this._runInit();
		const initObs = this.runPhaseCBs(this.initCBs);
		this.init();

		return Observable.forkJoin(initObs, _initObs);
	}

	public init(): void { };

	public registerInitAction(initCB: PhaseCB): void {
		this.initCBs.push(initCB);
	}

	protected abstract _runLoad(): Observable<{}[]>;
	public runLoad(): Observable<{}[]> {
		this.setPhase(RenderPhase.LOADING);

		const _loadObs = this._runLoad();
		const loadObs = this.runPhaseCBs(this.loadCBs);
		this.load();

		return Observable.forkJoin(loadObs, _loadObs);
	}

	public load(): void { };

	public registerLoadAction(cb: PhaseCB): void {
		this.loadCBs.push(cb);
	}

	protected abstract _runUpdate(delta: number): void;
	public runUpdate(delta: number): void {
		this.setPhase(RenderPhase.UPDATING);
		this.updateCBs.forEach(cb => {
			cb(delta);
		});
		this.update(delta);
		this._runUpdate(delta);
	}

	public update(delta: number): void { };

	public registerUpdateAction(cb: PhaseCB): void {
		this.updateCBs.push(cb);
	}

	protected abstract _runRender(delta: number): void;
	public runRender(delta: number): void {
		this.setPhase(RenderPhase.RENDERING);
		this.renderCBs.forEach(cb => {
			cb(delta);
		});
		this.render(delta);
		this._runRender(delta);
	}

	public render(delta: number): void { };

	public registerRenderAction(cb: PhaseCB): void {
		this.renderCBs.push(cb);
	}

	protected abstract _runPause(): void;
	public runPause(): void {
		this.setPhase(RenderPhase.PAUSED);
		this.pauseCBs.forEach(cb => {
			cb();
		});
		this.pause();
		this._runPause();
	};

	public pause(): void { };

	public registerPauseAction(cb: PhaseCB) {
		this.pauseCBs.push(cb);
	}

	protected abstract _runUnPause(): void;
	public runUnPause(): void {
		this.setPhase(RenderPhase.READY);
		this.unPauseCBs.forEach(cb => {
			cb();
		});
		this.unpause();
		this._runUnPause();
	};

	public unpause(): void { };

	public registerUnpauseAction(cb: PhaseCB): void {
		this.unPauseCBs.push(cb);
	}

	protected abstract _runUnLoad(): Observable<{}[]>;
	public runUnload(): Observable<{}[]> {
		this.setPhase(RenderPhase.UNLOADING);

		const _unLoadObs = this._runUnLoad();
		const unLoadObs = this.runPhaseCBs(this.unloadCBs);
		this.unload();
		return Observable.forkJoin(unLoadObs, _unLoadObs);
	}

	public unload(): void { };

	public registerUnloadAction(cb: PhaseCB): void {
		this.unloadCBs.push(cb);
	}

	protected abstract _runDestroy(): Observable<{}[]>;
	public runDestroy(): Observable<{}[]> {
		this.setPhase(RenderPhase.DESTROYING);

		const _loadObs = this._runDestroy();
		const loadObs = this.runPhaseCBs(this.destroyCBs);
		this.destroy();
		return Observable.forkJoin(loadObs, _loadObs);
	}

	public destroy() { };

	public registerDestroyAction(cb: PhaseCB): void {
		this.destroyCBs.push(cb);
	}

	phaseIs(phase: RenderPhase): boolean {
		return phase === this.phase || phase === Math.floor(this.phase);
	}

	getPhase(): RenderPhase {
		return this.phase;
	}

	setPhase(phase: RenderPhase): void {
		this.phase = phase;
	}

	private runPhaseCBs(cbs: PhaseCB[]): Observable<{}[]> {
		return Observable.create(observer => {
			cbs.forEach(cb => {
				cb();
			});
			observer.complete();
		});
	}

}