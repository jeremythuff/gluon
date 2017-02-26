export default class AbstractCliCommand {
    private rootPath;
    private globalModuleRoot;
    constructor(rootPath: string, globalModuleRoot: string);
    setRootPath(rootPath: string): void;
    getRootPath(): string;
    setGlobalModuleRoot(globalModuleRoot: string): void;
    getGlobalModuleRoot(): string;
}
