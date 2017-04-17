import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as assert from "assert";

import State from "../../../typescript/engine/model/State";
import Mode from "../../../typescript/engine/model/Mode";
import ControlProfile from "../../../typescript/engine/util/io/ControlProfile";

@suite class StateSpec {

    static STATE: State;
    static STATE_NAME: string;
    static STATE_FPS: number;

    static MODE_ONE: Mode;
    static MODE_ONE_NAME: string;

    static MODE_TWO: Mode;
    static MODE_TWO_NAME: string;

    before() {
        StateSpec.STATE = new State();
        StateSpec.STATE_NAME = "Test State";
        StateSpec.STATE_FPS = 30;
        StateSpec.MODE_ONE = new Mode();
        StateSpec.MODE_ONE_NAME = "Test Mode One";
        StateSpec.MODE_TWO = new Mode();
        StateSpec.MODE_TWO_NAME = "Test Mode Two";
    }

    
    @test "Test name accessors"() {
        StateSpec.STATE.setName(StateSpec.STATE_NAME);
        assert.equal(StateSpec.STATE.getName(), StateSpec.STATE_NAME);
     }

    @test "Test frame rate accessors"() {
        StateSpec.STATE.setFramesPerSecond(StateSpec.STATE_FPS);
        assert.equal(StateSpec.STATE_FPS, StateSpec.STATE.getFramesPerSecond());
    }

    @test "Test mode indavidual accessors"() {
        StateSpec.STATE.addMode(StateSpec.MODE_ONE);

        let contains: boolean = false;
        StateSpec.STATE.getModes().some(mode=>{
            contains = mode === StateSpec.MODE_ONE;
            return contains;
        });

        assert.equal(contains, true);    
     }

     @test "Test mode aggregated accessors"() {

        const modes: Mode[] = [];

        modes.push(StateSpec.MODE_ONE);
        modes.push(StateSpec.MODE_TWO);

        StateSpec.STATE.setModes(modes);        

        let contains: boolean = false;
        StateSpec.STATE.getModes().some(mode=>{
            contains = mode === StateSpec.MODE_ONE;
            return contains;
        });

        StateSpec.STATE.getModes().some(mode=>{
            contains = mode === StateSpec.MODE_TWO;
            return contains;
        });

        assert.equal(contains, true);    
     }

     @test "Test mode activated"() {
        StateSpec.STATE.activateMode(StateSpec.MODE_ONE);

        let contains: boolean = false;
        StateSpec.STATE.getActiveModes().some(mode=>{
            contains = mode === StateSpec.MODE_ONE;
            return contains;
        });

        assert.equal(contains, true);    
     }

     @test "Test mode deactivated"() {
        StateSpec.STATE.activateMode(StateSpec.MODE_ONE);

        let contains: boolean = false;
        StateSpec.STATE.getActiveModes().some(mode=>{
            contains = mode === StateSpec.MODE_ONE;
            return contains;
        });

        assert.equal(contains, true);

        StateSpec.STATE.deActivateMode(StateSpec.MODE_ONE);
        

        contains = false;
        StateSpec.STATE.getActiveModes().some(mode=>{
            contains = mode === StateSpec.MODE_ONE;
            return contains;
        });

        assert.equal(contains, false);

     }

     @test "Test mode deactivated aggregated"(done) {
        StateSpec.MODE_ONE.setName(StateSpec.MODE_ONE_NAME);
        StateSpec.STATE.activateMode(StateSpec.MODE_ONE);
        StateSpec.MODE_TWO.setName(StateSpec.MODE_TWO_NAME);
        StateSpec.STATE.activateMode(StateSpec.MODE_TWO);
        
        assert.equal(StateSpec.STATE.getActiveModes().length, 2);

        StateSpec.STATE.deActivateAllModes()
            .subscribe(null,null,()=>{
                assert.equal(StateSpec.STATE.getActiveModes().length, 0);
                done();
            });

     }

}