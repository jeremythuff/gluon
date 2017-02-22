import { CliCommand } from "./CliCommand";
export default class Init implements CliCommand {
    execute(args: Array<string>): void;
}
