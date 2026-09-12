import { Observable } from 'rxjs';

export interface File {
  filename: string;
  content: string;
}

export abstract class IFileService {
  abstract list(): Observable<string[]>;
  abstract load(filename: string): Observable<string>;
  abstract loadMultiple(filenames: string[]): Observable<File[]>;
  abstract save(filename: string, content: string): Observable<void>;
  abstract saveMultiple(files: File[]): Observable<void>;
  abstract delete(filename: string): Observable<void>;
  abstract rename(
    currentFilename: string,
    newFilename: string,
  ): Observable<void>;
}
