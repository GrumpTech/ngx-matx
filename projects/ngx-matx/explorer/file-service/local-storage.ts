import { Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { File, IFileService } from '../models';
import { MATX_EXPLORER_LOCAL_STORAGE_PREFIX } from '../constants';

@Injectable()
export class LocalStorage implements IFileService {
  private readonly prefix = inject(MATX_EXPLORER_LOCAL_STORAGE_PREFIX);

  list(): Observable<string[]> {
    const result: string[] = [];
    for (let i = 0, l = localStorage.length; i < l; i++) {
      const key = localStorage.key(i);
      key?.startsWith(this.prefix) &&
        result.push(key.substring(this.prefix.length));
    }
    return of(result);
  }

  load(filename: string): Observable<string> {
    const content = localStorage.getItem(`${this.prefix}${filename}`);
    if (content === null) {
      throw 'File does not exist';
    }
    return of(content);
  }

  loadMultiple(filenames: string[]): Observable<File[]> {
    return of(
      filenames.map((i) => {
        const content = localStorage.getItem(`${this.prefix}${i}`);
        return { filename: i, content: content ?? '' };
      }),
    );
  }

  save(filename: string, content: string): Observable<void> {
    localStorage.setItem(`${this.prefix}${filename}`, content);
    return of(void 0);
  }

  saveMultiple(files: File[]): Observable<void> {
    files.forEach((f) => this.save(f.filename, f.content));
    return of(void 0);
  }

  delete(filename: string): Observable<void> {
    localStorage.removeItem(`${this.prefix}${filename}`);
    return of(void 0);
  }

  rename(currentFilename: string, newFilename: string): Observable<void> {
    if (localStorage.getItem(`${this.prefix}${newFilename}`)) {
      throw `File with name ${newFilename} already exists.`;
    }
    const content =
      localStorage.getItem(`${this.prefix}${currentFilename}`) ?? '';
    localStorage.setItem(`${this.prefix}${newFilename}`, content);
    localStorage.removeItem(`${this.prefix}${currentFilename}`);
    return of(void 0);
  }
}
