import { CliCommand } from "./CliCommand";
export default class Help implements CliCommand {
    execute(args: Array<string>): void;
}
