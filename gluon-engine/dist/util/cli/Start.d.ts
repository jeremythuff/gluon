import { CliCommand } from "./CliCommand";
export default class Start implements CliCommand {
    run(args: Array<string>): void;
}
