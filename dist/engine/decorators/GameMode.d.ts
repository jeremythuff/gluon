import Mode from "../model/Mode";
export default function GameMode(options?: {
    [name: string]: any[] | string;
}): (decorated: typeof Mode) => typeof Mode;
