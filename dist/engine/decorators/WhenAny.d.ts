import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";
export default function When(...inputs: (Keyboard | Mouse)[]): (targetClass: ControlProfile, methodName: string, descriptor: PropertyDescriptor) => void;
