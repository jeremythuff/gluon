import { CliCommand } from "./CliCommand";
export default class Help implements CliCommand {
    run(args: Array<string>): void;
}
