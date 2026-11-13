import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { File, MatxFileImporter } from '@grumptech/ngx-matx/file-importer';

@Component({
  selector: 'app-file-importer-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatxFileImporter],
  template: `
    <button mat-flat-button (click)="chooseFiles()">Choose text files</button>
    <matx-file-importer (imported)="handleImported($event)" />
    @for (file of files(); track file.filename) {
      <p>
        <strong>{{ file.filename }}</strong
        >: {{ file.content }}
      </p>
    }
  `,
})
export class FileImporterDemo {
  protected readonly files = signal<File[]>([]);

  private readonly importer = viewChild.required(MatxFileImporter);

  protected chooseFiles(): void {
    this.importer().import(true, ['txt', 'json']);
  }

  protected handleImported(files: File[]): void {
    this.files.set(files);
  }
}
