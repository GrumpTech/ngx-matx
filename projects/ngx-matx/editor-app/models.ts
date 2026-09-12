import { ModificationState } from '@grumptech/ngx-matx/file-tab-bar';

export class FileCommand {
  constructor(
    public commandType: FileCommandType,
    public data?: string,
  ) {}
}

export enum FileCommandType {
  FileNew,
  FileSave,
  FileSaveAs,
  FileSaveAll,
  FileRename,
  FileDelete,
  FileClose,
  FileCloseAll,
  FileImport,
  FileExport,
}

export interface Tab<T> {
  filename: string;
  content: string;
  data: T;
  modificationState: ModificationState;
}

export interface Result<T> {
  success: boolean;
  message: string;
  result: T;
}

export interface NameAndData<T> {
  name: string;
  data: T;
}

export abstract class IImporter<T> {
  abstract get name(): string;
  abstract get hasMultipleFileSelection(): boolean;
  abstract get extensions(): string[];

  abstract import: (
    data: string,
    filename: string,
  ) => Promise<Result<NameAndData<T>[]>>;
}

export abstract class IExporter<T> {
  abstract get name(): string;
  abstract get extension(): string;

  abstract export: (data: T) => string;
}
