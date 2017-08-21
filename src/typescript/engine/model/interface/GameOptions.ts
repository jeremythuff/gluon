import State from "../State";
import ControlProfile from "../../util/io/ControlProfile";

export interface GameOptions {
    initialState?: typeof State;
    controlProfiles?: Array<typeof ControlProfile>;

}