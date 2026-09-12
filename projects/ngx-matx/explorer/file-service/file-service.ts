import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MATX_EXPLORER_FILE_SERVICE_URL } from '../constants';
import { File, IFileService } from '../models';

@Injectable()
export class FileService implements IFileService {
  private httpClient = inject(HttpClient);
  private baseUrl = inject(MATX_EXPLORER_FILE_SERVICE_URL);

  list(): Observable<string[]> {
    return this.httpClient.get(`${this.baseUrl}/files`) as Observable<string[]>;
  }

  load(filename: string): Observable<string> {
    return this.httpClient.get(`${this.baseUrl}/file`, {
      params: { filename },
      responseType: 'text',
    }) as Observable<string>;
  }

  loadMultiple(filenames: string[]): Observable<File[]> {
    return this.httpClient.post(`${this.baseUrl}/files/load`, filenames, {
      responseType: 'json',
    }) as Observable<File[]>;
  }

  save(filename: string, content: string): Observable<void> {
    return this.httpClient
      .post(`${this.baseUrl}/file`, {
        filename,
        content,
      })
      .pipe(map(() => void 0));
  }

  saveMultiple(files: File[]): Observable<void> {
    return this.httpClient
      .post(`${this.baseUrl}/files`, files)
      .pipe(map(() => void 0));
  }

  delete(filename: string): Observable<void> {
    return this.httpClient
      .delete(`${this.baseUrl}/file?filename=${filename}`)
      .pipe(map(() => void 0));
  }

  rename(currentFilename: string, newFilename: string): Observable<void> {
    return this.httpClient
      .post(`${this.baseUrl}/file/rename`, {
        currentFilename,
        newFilename,
      })
      .pipe(map(() => void 0));
  }
}
