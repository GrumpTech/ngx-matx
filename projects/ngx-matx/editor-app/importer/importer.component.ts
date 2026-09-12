import {
  Component,
  output,
  viewChild,
  ChangeDetectionStrategy,
  input,
  inject,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { File, MatxFileImporter } from '@grumptech/ngx-matx/file-importer';
import { ImportManagerBase } from '../services/import-manager';
import { NameAndData } from '../models';

@Component({
  selector: 'matx-editor-app-importer',
  templateUrl: './importer.component.html',
  styleUrl: './importer.component.scss',
  imports: [MatxFileImporter],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxEditorAppImporter<T> {
  readonly imported = output<NameAndData<T>[]>();
  readonly importManager = input<ImportManagerBase<T>>(new ImportManagerBase());

  protected readonly hasError = signal(false);

  private readonly changeDectorRef = inject(ChangeDetectorRef);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fileImporter = viewChild.required(MatxFileImporter);

  private currentImporterName = '';

  import(importerName: string): void {
    if (this.currentImporterName !== '') {
      this.currentImporterName = '';
      this.hasError.set(true); // cancels previous import
      this.changeDectorRef.detectChanges();
      this.hasError.set(false);
      this.changeDectorRef.detectChanges();
    }
    this.currentImporterName = importerName;
    const multiple =
      this.importManager().hasMultipleFileSelection(importerName);
    const extensions = this.importManager().getExtensions(importerName);
    this.fileImporter().import(multiple, extensions);
  }

  handleImported(files: File[]) {
    if (this.currentImporterName === '') {
      return;
    }
    const observables = files.map((i) =>
      this.importManager().import(
        this.currentImporterName,
        i.content,
        i.filename,
      ),
    );
    forkJoin(observables).subscribe((result) => {
      const messages: { [key: string]: string } = {};
      const files: NameAndData<T>[] = [];
      result.forEach((i, idx) => {
        files.push(...i.result.map((j) => ({ name: j.name, data: j.data })));
        if (!i.success) {
          messages[files[idx].name] = i.message;
        }
      });
      if (files.length) {
        this.imported.emit(files);
      }
      if (Object.keys(messages).length) {
        const warning = `Could not parse file${
          Object.keys(messages).length > 1 ? 's' : ''
        }.`;
        console.warn(warning, messages);
        this.snackBar.open(warning, 'X');
      }
      this.currentImporterName = '';
    });
  }
}
