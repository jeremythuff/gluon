/**
 * The Render Phase Enum denotes the phases which any class implementing 
 * the [[RenderCycle]] interface will move through.
 */
export enum RenderPhase {
	START = 0,
	INITIALIZING = 0.1,
	LOADING = 0.2,
	STARTING = START | INITIALIZING | LOADING,
	READY = 1,
	UPDATING = 1.1,
	RENDERING = 1.2,
	RUNNING = READY | UPDATING | RENDERING,
	PAUSED = 2,
	STOP = 3,
	UNLOADING = 3.1,
	DESTROYING = 3.2,
	STOPPING = STOP | UNLOADING | DESTROYING,
	OFF = -1
}