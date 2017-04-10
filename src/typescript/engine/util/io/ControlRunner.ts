import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { ControlCB } from "./ControlCB";
import KeyboardListener from "./KeyboardListener";
import MouseListener from "./MouseListener";
import ControlProfile from "./ControlProfile";

import { AbstractControllable } from "../../model/abstracts/AbstractControllable";

export default class ControlRunner {

	protected lastEvents: Map<string, Event>;

	private keyboardListener: KeyboardListener;
	private mouseListener: MouseListener;

	private alreadyRun: Array<ControlCB[]>;

	private cbsToCall: Map<(Keyboard | Mouse)[], ControlCB[]>

	private activatedInput: boolean[];

	constructor() {

		this.cbsToCall = new Map<(Keyboard | Mouse)[], ControlCB[]>();
		this.alreadyRun = [];
		this.activatedInput = [];


		this.keyboardListener = new KeyboardListener(this.alreadyRun, this.activatedInput);
		this.mouseListener = new MouseListener(this.alreadyRun, this.activatedInput);

		this.lastEvents = new Map<string, Event>();

	}

	_runCBs(profiles: ControlProfile<AbstractControllable>[], delta?: number): void {
		this.runWhileCBs(profiles, delta);
		this.runWhenCBs(profiles, delta);

		const lastEventMap = new Map<string, Event>();

		lastEventMap.set("keyboard", this.keyboardListener.getLastEvent());
		lastEventMap.set("mouse", this.mouseListener.getLastEvent());

		this.cbsToCall.forEach((cbArr, inputs) => cbArr.forEach(cb => {
			cb(lastEventMap, delta);
		}));

		this.cbsToCall.clear();
	}

	private runWhenCBs(profiles: ControlProfile<AbstractControllable>[], delta?: number): void {

		profiles.forEach(profile => {

			profile.getWhenCBs().forEach((cbArr, inputArr) => {
				const inputsActive = inputArr.every(k => {
					return this.activatedInput[k];
				});

				if (inputsActive && this.alreadyRun.indexOf(cbArr) === -1) {

					cbArr.forEach((cb, i, arr) => {
						arr[i] = cb.bind(profile);
					});

					this.cbsToCall.set(inputArr, cbArr);
					this.alreadyRun.push(cbArr);

					this.cbsToCall.forEach((cA, iA, map) => {

						if (iA !== inputArr && iA.some(i => {
							return inputArr.indexOf(i) !== -1;
						})) {

							if (iA.length <= inputArr.length) {
								this.cbsToCall.delete(iA);
							} else {
								this.cbsToCall.delete(inputArr);
							}
						}
					});

				}

			});

		});
	}

	private runWhileCBs(profiles: ControlProfile<AbstractControllable>[], delta?: number): void {

		profiles.forEach(profile => {

			profile.getWhileCBs().forEach((cbArr, inputArr) => {

				const inputsActive = inputArr.every(k => {
					return this.activatedInput[k];
				});

				if (inputsActive) {

					cbArr.forEach((cb, i, arr) => {
						arr[i] = cb.bind(profile);
					});

					this.cbsToCall.set(inputArr, cbArr);

					this.cbsToCall.forEach((cA, iA, map) => {

						if (iA !== inputArr && iA.some(i => {
							return inputArr.indexOf(i) !== -1;
						})) {

							if (iA.length <= inputArr.length) {
								this.cbsToCall.delete(iA);
							} else {
								this.cbsToCall.delete(inputArr);
							}

						}
					});

				}

			});

		});


	}

}