import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'matx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButton],
})
export class MatxConfirmationDialog {
  dialogRef = inject(MatDialogRef<MatxConfirmationDialog, boolean>);
  data = inject<{
    title: string;
    message: string;
  }>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close();
  }
}
