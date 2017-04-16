import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as assert from "assert";

import State from "../../../typescript/engine/model/State";
import Mode from "../../../typescript/engine/model/Mode";

@suite class StateSpec {

    static readonly STATE: State = new State();
    static readonly STATE_NAME: string = "Test State";

    static readonly MODE: Mode = new Mode();
    static readonly MODE_NAME: string = "Test Mode";
    
    @test "Test name accessors"() {
        StateSpec.STATE.setName(StateSpec.STATE_NAME);
        assert.equal(StateSpec.STATE.getName(), StateSpec.STATE_NAME);
     }

    @test "Test mode accessors"() {
        StateSpec.STATE.addMode(StateSpec.MODE);

        let contains: boolean = false;
        StateSpec.STATE.getModes().some(mode=>{
            contains = mode === StateSpec.MODE;
            return contains;
        });

        assert.equal(contains, true);    
     }

}