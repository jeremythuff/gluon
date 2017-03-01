import { RenderCycle } from "./interface/RenderCycle";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
export default class Game implements RenderCycle {
    private running;
    private name;
    constructor(name?: string);
    getName(): string;
    setName(name: string): void;
    isRunning(running?: boolean): boolean;
    init(): Observable<any>;
    load(): Observable<any>;
    update(): void;
    render(): void;
    destroy(): void;
}
