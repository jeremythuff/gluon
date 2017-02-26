import { CliCommand } from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";
export default class Build extends AbstractCliCommand implements CliCommand {
    execute(args: Array<string>): void;
}
