import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as assert from "assert";

import State from "../../../typescript/engine/model/State";
import Mode from "../../../typescript/engine/model/Mode";

@suite class StateSpec {

  private STATE: State;
  private readonly STATE_NAME: string = "Test State";
  private readonly STATE_FPS: number = 30;

  private MODE_ONE: Mode;
  private readonly MODE_ONE_NAME: string = "Test Mode One";

  private MODE_TWO: Mode;
  private readonly MODE_TWO_NAME: string = "Test Mode Two";

  before() {
    this.STATE = new State();
    this.MODE_ONE = new Mode();
    this.MODE_TWO = new Mode();
  }


  @test "Test name accessors"() {
    this.STATE.setName(this.STATE_NAME);
    assert.equal(this.STATE.getName(), this.STATE_NAME);
  }

  @test "Test frame rate accessors"() {
    this.STATE.setFramesPerSecond(this.STATE_FPS);
    assert.equal(this.STATE_FPS, this.STATE.getFramesPerSecond());
  }

  @test "Test mode indavidual accessors"() {
    this.STATE.addMode(this.MODE_ONE);

    let contains: boolean = false;
    this.STATE.getModes().some(mode => {
      contains = mode === this.MODE_ONE;
      return contains;
    });

    assert.equal(contains, true);
  }

  @test "Test mode aggregated accessors"() {

    const modes: Mode[] = [];

    modes.push(this.MODE_ONE);
    modes.push(this.MODE_TWO);

    this.STATE.setModes(modes);

    let contains: boolean = false;
    this.STATE.getModes().some(mode => {
      contains = mode === this.MODE_ONE;
      return contains;
    });

    this.STATE.getModes().some(mode => {
      contains = mode === this.MODE_TWO;
      return contains;
    });

    assert.equal(contains, true);
  }

  @test "Test mode activated"() {
    this.STATE.activateMode(this.MODE_ONE);

    let contains: boolean = false;
    this.STATE.getActiveModes().some(mode => {
      contains = mode === this.MODE_ONE;
      return contains;
    });

    assert.equal(contains, true);
  }

  @test "Test mode deactivated"() {
    this.STATE.activateMode(this.MODE_ONE);

    let contains: boolean = false;
    this.STATE.getActiveModes().some(mode => {
      contains = mode === this.MODE_ONE;
      return contains;
    });

    assert.equal(contains, true);

    this.STATE.deActivateMode(this.MODE_ONE);


    contains = false;
    this.STATE.getActiveModes().some(mode => {
      contains = mode === this.MODE_ONE;
      return contains;
    });

    assert.equal(contains, false);

  }

  @test "Test mode deactivated aggregated"(done) {
    this.MODE_ONE.setName(this.MODE_ONE_NAME);
    this.STATE.activateMode(this.MODE_ONE);
    this.MODE_TWO.setName(this.MODE_TWO_NAME);
    this.STATE.activateMode(this.MODE_TWO);

    assert.equal(this.STATE.getActiveModes().length, 2);

    this.STATE.deActivateAllModes()
      .subscribe(null, null, () => {
        assert.equal(this.STATE.getActiveModes().length, 0);
        done();
      });

  }

}
