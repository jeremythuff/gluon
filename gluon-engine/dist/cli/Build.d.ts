import { CliCommand } from "./CliCommand";
export default class Build implements CliCommand {
    execute(args: Array<string>): void;
}
