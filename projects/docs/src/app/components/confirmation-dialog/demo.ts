import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatxConfirmationDialog } from '@grumptech/ngx-matx/confirmation-dialog';

@Component({
  selector: 'app-confirmation-dialog-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton],
  template: `
    <button mat-flat-button (click)="open()">Delete item</button>
    <p>Result: {{ result() }}</p>
  `,
})
export class ConfirmationDialogDemo {
  private dialog = inject(MatDialog);
  result = signal('none yet');

  open(): void {
    this.dialog
      .open(MatxConfirmationDialog, {
        data: {
          title: 'Delete item',
          message: 'Are you sure you want to delete this item?',
        },
      })
      .afterClosed()
      .subscribe((confirmed?: boolean) =>
        this.result.set(confirmed ? 'confirmed' : 'cancelled'),
      );
  }
}
