import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";
import { AbstractControllable } from "../model/abstracts/AbstractControllable";
export default function When(...inputs: (Keyboard | Mouse | (Keyboard | Mouse)[])[]): (targetClass: ControlProfile<AbstractControllable>, methodName: string, descriptor: PropertyDescriptor) => void;
