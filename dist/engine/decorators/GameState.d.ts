import State from "../model/State";
export default function GameState(options?: {
    [name: string]: any[] | string;
}): (decorated: typeof State) => void;
