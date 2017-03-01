import { CliCommand } from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";
export default class Help extends AbstractCliCommand implements CliCommand {
    static help: [string, string];
    execute(args: Array<string>): void;
}
