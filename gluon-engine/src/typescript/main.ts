import Engine from "./model/Engine";
import Game from "./model/Game";

let engine = new Engine("My Game");

console.log(engine.getGame().getName());