import { CliCommand } from "./CliCommand";
export default class Start implements CliCommand {
    execute(args: Array<string>): void;
}
