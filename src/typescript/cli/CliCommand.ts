
export interface CliCommand {
	execute(args: Array<string>): void;
}