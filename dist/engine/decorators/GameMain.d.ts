import Game from "../model/Game";
export default function GameMain(options?: {
    [name: string]: any[] | string;
}): (decorated: typeof Game) => void;
