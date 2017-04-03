import ControlProfile from "../util/io/ControlProfile";
export default function GameController(options?: {
    [name: string]: any[] | string;
}): (decorated: typeof ControlProfile) => void;
