import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { MatxFullWidthFormFields } from '@grumptech/ngx-matx/full-width-form-fields';

@Component({
  selector: 'matx-explorer-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatDialogModule,
    MatxFullWidthFormFields,
  ],
})
export class MatxExplorerDialog implements OnInit {
  dialogRef = inject(MatDialogRef<MatxExplorerDialog, string>);
  data = inject<{
    title: string;
    buttonText: string;
    exclude: Set<string>;
    value: string;
  }>(MAT_DIALOG_DATA);

  protected formControl!: FormControl;
  protected buttonDisabled!: Observable<boolean>;

  ngOnInit(): void {
    this.formControl = new FormControl(
      this.data.value,
      this.notInSetValidator(this.data.exclude),
    );
    this.buttonDisabled = this.formControl.valueChanges.pipe(
      startWith(false),
      map((value) => !this.canCommit(value)),
    );
    this.formControl.markAsTouched();
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected click(): void {
    if (this.formControl.valid && this.canCommit(this.formControl.value)) {
      this.dialogRef.close(this.formControl.value);
    }
  }

  protected commit(event: Event): void {
    if (this.formControl.valid && this.canCommit(this.formControl.value)) {
      event.preventDefault();
      this.dialogRef.close(this.formControl.value);
    }
  }

  private canCommit(value: string): boolean {
    return (value || '').trim().length !== 0 && value !== this.data.value;
  }

  private notInSetValidator(set: Set<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase();
      const valid = !set.has(value);
      return valid ? null : { inList: true };
    };
  }
}
