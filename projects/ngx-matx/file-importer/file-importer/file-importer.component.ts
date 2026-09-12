import {
  ElementRef,
  Component,
  output,
  viewChild,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { forkJoin, from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { File as ImportedFile } from '../models';

@Component({
  selector: 'matx-file-importer',
  templateUrl: './file-importer.component.html',
  styleUrl: './file-importer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxFileImporter {
  readonly imported = output<ImportedFile[]>();

  private readonly elementRef = viewChild.required<ElementRef>('files');
  private readonly destroyRef = inject(DestroyRef);

  import(multiple = false, extensions: string[] = []): void {
    const input = this.elementRef().nativeElement as HTMLInputElement;
    input.value = '';
    input.multiple = multiple;
    input.accept = extensions.map((i) => `.${i}`).join(',');
    input.click();
  }

  readFiles(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files?.length) {
      return;
    }
    const importFiles = Array.from(files).map((i) => from(this.readFile(i)));
    forkJoin(importFiles)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.imported.emit(result));
  }

  private readFile(file: File): Promise<ImportedFile> {
    return new Promise<ImportedFile>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve({
          filename: file.name,
          content: fileReader.result?.toString() ?? '',
        });
      };
      fileReader.onerror = function () {
        reject(new Error('File importer: Error reading file.'));
      };
      fileReader.readAsText(file);
    });
  }
}
