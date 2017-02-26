import { CliCommand } from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";
export default class Init extends AbstractCliCommand implements CliCommand {
    execute(args: Array<string>): void;
}
