import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
export default class FileLoader {
    static getFileContents(path: string): Observable<string>;
}
