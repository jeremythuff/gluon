import { RenderCycle } from "./interface/RenderCycle";
export default class Game implements RenderCycle {
    private running;
    private name;
    constructor(name?: string);
    getName(): string;
    setName(name: string): void;
    isRunning(running?: boolean): boolean;
    init(): Promise<any>;
    load(): Promise<any>;
    update(): void;
    render(): void;
    destroy(): void;
}
