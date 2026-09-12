import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, filter, Observable, Subject, tap } from 'rxjs';
import { MatxConfirmationDialog } from '@grumptech/ngx-matx/confirmation-dialog';
import { MatxFileTree } from '../file-tree/file-tree.component';
import { MatxExplorerDialog } from '../dialog/dialog.component';
import { File, IFileService } from '../models';

@Component({
  selector: 'matx-explorer',
  templateUrl: './explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxFileTree],
})
export class MatxExplorer implements OnInit {
  readonly extension = input('');
  readonly selectedFile = input('');
  readonly fileClick = output<string>();
  readonly filesLoaded = output<number>();

  protected readonly filenames = signal<string[]>([]);

  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly fileService = inject(IFileService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fileTree = viewChild.required(MatxFileTree);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.fileService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.filenames.set(
            this.extension() === ''
              ? data
              : data
                  .filter((i) => i.endsWith(`.${this.extension()}`))
                  .map((i) => this.removeExtension(i)),
          );
          this.filesLoaded.emit(this.filenames().length);
        },
        error: (error) => this.handleError('Failed loading files.', error),
      });
  }

  getFileNames(): string[] {
    return this.filenames();
  }

  collapseAll(): void {
    this.fileTree().collapseAll();
  }

  openFile(filename: string): Observable<string> {
    return this.fileService.load(`${filename}.${this.extension()}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((error) => {
        this.handleError('Failed loading file.', error);
        return EMPTY;
      }),
    );
  }

  openFiles(filenames: string[]): Observable<File[]> {
    return this.fileService
      .loadMultiple(filenames.map((i) => this.addExtension(i)))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((i) =>
          i.forEach((j) => (j.filename = this.removeExtension(j.filename))),
        ),
        catchError((error) => {
          this.handleError('Failed loading file.', error);
          return EMPTY;
        }),
      );
  }

  saveFile(filename: string, content: string): Observable<void> {
    return this.fileService.save(this.addExtension(filename), content).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        this.refresh();
        this.showMessage('File saved.');
      }),
      catchError((error) => {
        this.handleError('Failed saving file.', error);
        return EMPTY;
      }),
    );
  }

  saveFileAs(
    filename: string,
    content: string,
    excludeFilenames: string[] = [],
  ): Observable<string> {
    const subject = new Subject<string>();
    const dialogRef = this.openSaveDialog(
      'Save file',
      'Save',
      filename,
      excludeFilenames,
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveFile(result, content).subscribe({
          next: () => {
            subject.next(result);
            subject.complete();
            this.refresh();
          },
          error: () => subject.complete(),
        });
      } else {
        subject.complete();
      }
    });
    return subject;
  }

  saveFiles(files: File[]): Observable<void> {
    files = files.map((i) => ({
      filename: this.addExtension(i.filename),
      content: i.content,
    }));
    return this.fileService.saveMultiple(files).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        this.refresh();
        this.showMessage('Files saved.');
      }),
      catchError((error) => {
        this.handleError('Failed saving files.', error);
        return EMPTY;
      }),
    );
  }

  renameFile(
    filename: string,
    excludeFilenames: string[] = [],
  ): Observable<string> {
    const subject = new Subject<string>();
    const dialogRef = this.openSaveDialog(
      'Rename file',
      'Rename',
      filename,
      excludeFilenames,
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileService
          .rename(this.addExtension(filename), this.addExtension(result))
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              subject.next(result);
              subject.complete();
              this.refresh();
            },
            error: (error) => {
              subject.complete();
              this.handleError('Failed renaming file.', error);
            },
          });
      } else {
        subject.complete();
      }
    });
    return subject.asObservable();
  }

  renameNewFile(
    filename: string,
    excludeFilenames: string[] = [],
  ): Observable<string> {
    const dialogRef = this.openSaveDialog(
      'Rename file',
      'Rename',
      filename,
      excludeFilenames,
    );
    return dialogRef.afterClosed().pipe(filter((i) => i !== undefined));
  }

  deleteFile(filename: string): Observable<void> {
    const subject = new Subject<void>();
    this.dialog
      .open(MatxConfirmationDialog, {
        data: {
          title: 'Delete file',
          message: 'Are you sure you want to delete this file?',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.fileService
            .delete(this.addExtension(filename))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                subject.next();
                subject.complete();
                this.refresh();
              },
              error: (error) => {
                this.handleError('Failed deleting file.', error);
                subject.complete();
              },
            });
        } else {
          subject.complete();
        }
      });
    return subject.asObservable();
  }

  protected handleFileClick(filename: string): void {
    this.fileClick.emit(filename);
  }

  private openSaveDialog(
    title: string,
    buttonText: string,
    currentFilename = '',
    excludeFilenames: string[] = [],
  ): MatDialogRef<MatxExplorerDialog, string> {
    const exclude = new Set<string>(
      this.filenames().concat(excludeFilenames.map((i) => i.toLowerCase())),
    );
    exclude.delete(currentFilename.toLowerCase());
    return this.dialog.open(MatxExplorerDialog, {
      width: '500px',
      data: {
        title,
        buttonText,
        exclude,
        value: currentFilename,
      },
    });
  }

  private addExtension(filename: string): string {
    const extension = this.extension();
    return extension === '' ? filename : `${filename}.${extension}`;
  }

  private removeExtension(filename: string): string {
    const extension = this.extension();
    if (extension === '' || !filename.endsWith(`.${extension}`)) {
      return filename;
    }
    return filename.slice(0, -(extension.length + 1));
  }

  private handleError(message: string, error: any): void {
    this.showMessage(message);
    console.warn(message, error);
    this.refresh();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'X');
  }
}
