
import * as fs from "fs";
import { ReplaySubject, Observable } from "@reactivex/rxjs/dist/cjs/Rx";

export default class FileLoader {
	
	public static getFileContents(path: string): Observable<string>  {

		const fileSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

		fs.readFile(path, (e, buffer)=>{
			fileSubject.next(buffer.toString());
		});

		return fileSubject.asObservable();
	}
}