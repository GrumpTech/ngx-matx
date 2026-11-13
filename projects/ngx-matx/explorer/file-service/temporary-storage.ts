import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { File, IFileService } from '../models';

@Injectable()
export class TemporaryStorage implements IFileService {
  private files = new Map<string, string>();

  list(): Observable<string[]> {
    const result: string[] = [];
    for (const [key] of this.files) {
      result.push(key);
    }
    return of(result);
  }

  load(filename: string): Observable<string> {
    const content = this.files.get(filename);
    if (content === undefined) {
      throw 'File does not exist';
    }
    return of(content);
  }

  loadMultiple(filenames: string[]): Observable<File[]> {
    return of(
      filenames.map((i) => {
        const content = this.files.get(i);
        return { filename: i, content: content ?? '' };
      }),
    );
  }

  save(filename: string, content: string): Observable<void> {
    this.files.set(filename, content);
    return of(void 0);
  }

  saveMultiple(files: File[]): Observable<void> {
    files.forEach((f) => this.save(f.filename, f.content));
    return of(void 0);
  }

  delete(filename: string): Observable<void> {
    this.files.delete(filename);
    return of(void 0);
  }

  rename(currentFilename: string, newFilename: string): Observable<void> {
    if (this.files.has(newFilename)) {
      throw `File with name ${newFilename} already exists.`;
    }
    const content = this.files.get(currentFilename);
    if (content !== undefined) {
      this.files.set(newFilename, content);
      this.files.delete(currentFilename);
    }
    return of(void 0);
  }
}
