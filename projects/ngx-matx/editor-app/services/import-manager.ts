import { Observable, from } from 'rxjs';
import { IImporter, NameAndData, Result } from '../models';

export class ImportManagerBase<T> {
  private importersByName = new Map<string, IImporter<T>>();

  set(importers: IImporter<T>[]) {
    this.importersByName.clear();
    importers.forEach((i) => {
      this.importersByName.set(i.name, i);
    });
  }

  getNames(): string[] {
    return [...this.importersByName.keys()];
  }

  getFirstName(): string {
    const names = this.getNames();
    return names.length ? names[0] : '';
  }

  getExtensions(name: string): string[] {
    return this.importersByName.get(name)?.extensions ?? [];
  }

  hasMultipleFileSelection(name: string): boolean {
    return this.importersByName.get(name)?.hasMultipleFileSelection ?? true;
  }

  import(
    importerName: string,
    data: string,
    filename: string,
  ): Observable<Result<NameAndData<T>[]>> {
    const importer = this.importersByName.get(importerName);
    if (!importer) {
      throw new Error('ImportManager: importer does not exist');
    }
    const name = importer.extensions
      ? this.stripExtensions(filename, importer.extensions ?? [])
      : '';
    return from(importer.import(data, name));
  }

  private stripExtensions(filename: string, extensions: string[]): string {
    const length = Math.max(
      0,
      ...extensions
        .filter((i) => filename.endsWith(`.${i}`))
        .map((i) => i.length + 1),
    );
    return filename.substring(0, filename.length - length);
  }
}
