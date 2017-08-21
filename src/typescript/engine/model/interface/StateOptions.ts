import Mode from "../Mode";
import ControlProfile from "../../util/io/ControlProfile";

export interface StateOptions {
    modes?: Array<typeof Mode>;
    controlProfiles?: Array<typeof ControlProfile>;
}