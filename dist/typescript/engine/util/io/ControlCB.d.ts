export interface ControlCB {
    (events?: Map<string, {}>, delta?: number): void;
}
