
export interface CliCommand {
	execute(args: string[]): void;
}