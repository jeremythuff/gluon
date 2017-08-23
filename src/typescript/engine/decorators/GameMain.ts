import "reflect-metadata";

import Engine from "../model/Engine"
import Game from "../model/Game"

import * as RunningGameRegistry from "../registries/GameMainRegistry";
import * as GameStateRegistry from "../registries/GameStateRegistry";
import * as GameControllereRegistry from "../registries/GameControllerRegistry";

import { ControlProfile } from "../util/io/ControlProfile";
import { Controllable } from "../model/interface/Controllable";
import { GameOptions } from "../model/interface/GameOptions";

/**
 * This function is used to decorate classes which extend [[Game]]. It registers such
 * classes with the [[RunningGameRegistry]] namespace, denotes it as the main entry point for your game, 
 * and will ensure that the game is instantiated at start up. It will derive the name of your game 
 * from the class name of the decorated class.
 *
 * @decorator Class<typeof Game>
 */
export default function GameMain(options?: GameOptions) {
	return function decorator(decorated: typeof Game): void {

		Reflect.defineMetadata("options", options, decorated);

		const game = new decorated(decorated.name);

		if (!game.getName())
			game.setName(decorated.name);

		if(options.initialState)
			game.setInitialStateName(options.initialState.name);


		GameControllereRegistry.getControlProfileObservable().subscribe(ControlProfile => {

			const controlProfileNames = options.controlProfiles;

			if (controlProfileNames && controlProfileNames.some(controlProfile => {
				return controlProfile.name === ControlProfile.name;
			})) {

				const newControllerProfile: ControlProfile<Controllable> = new ControlProfile<Controllable>(game);
				const whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
				const whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);

				newControllerProfile.setWhileCBs(whileMap);
				newControllerProfile.setWhenCBs(whenMap);

				game.addControlProfile(newControllerProfile);

			}
		});

		console.log(`Registering Game: ${game.getName()}`);
		RunningGameRegistry.setGameMain(game);

		const runningGameSubject = RunningGameRegistry.getGameMainSubject();
		runningGameSubject.subscribe(game => {
			const lastRegisteredStateObservable = GameStateRegistry.getLastRegisteredGameState();
			lastRegisteredStateObservable.subscribe(state => {
				if (state.getName() === game.getInitialStateName()) {
					console.log("Starting engine");
					const engine = new Engine(game);
					engine.start();
				}
			});
		});

	}
}