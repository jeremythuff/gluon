import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";
export default function While(...inputs: (Keyboard | Mouse)[]): (targetClass: typeof ControlProfile, methodName: string, descriptor: PropertyDescriptor) => void;
