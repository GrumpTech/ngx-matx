import { Provider } from '@angular/core';
import { FileService } from './file-service/file-service';
import { LocalStorage } from './file-service/local-storage';
import { IFileService } from './models';
import {
  MATX_EXPLORER_FILE_SERVICE_URL,
  MATX_EXPLORER_LOCAL_STORAGE_PREFIX,
} from './constants';

export function provideExplorer(fileServiceUrl: string): Provider {
  return [
    { provide: IFileService, useClass: FileService },
    { provide: MATX_EXPLORER_FILE_SERVICE_URL, useValue: fileServiceUrl },
  ];
}

export function provideLocalStorageExplorer(
  prefix: string = 'matx_explorer_',
): Provider {
  return [
    { provide: IFileService, useClass: LocalStorage },
    { provide: MATX_EXPLORER_LOCAL_STORAGE_PREFIX, useValue: prefix },
  ];
}
