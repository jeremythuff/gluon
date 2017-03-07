import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderCycle } from "./interface/RenderCycle";
export default class State implements RenderCycle {
    private name;
    constructor(name?: string);
    init(): Observable<any>;
    load(): Observable<any>;
    update(): void;
    render(): void;
    destroy(): void;
    getName(): string;
    setName(name: string): void;
}
