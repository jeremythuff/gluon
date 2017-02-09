import * as THREE from "three";
import {MyModel} from "model/MyModel";

export declare class Greeter {
    constructor(greeting: string);

    myModel: MyModel;
    greeting: string;
    showGreeting(): void;
}

const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.myModel = new MyModel("Hello");
myGreeter.showGreeting();