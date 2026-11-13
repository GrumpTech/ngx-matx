import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatxFullWidthFormFields } from '@grumptech/ngx-matx/full-width-form-fields';

@Component({
  selector: 'app-full-width-form-fields-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, MatxFullWidthFormFields],
  template: `
    <matx-full-width-form-fields>
      <mat-form-field>
        <mat-label>Project name</mat-label>
        <input matInput value="My project" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="3">A full-width text field</textarea>
      </mat-form-field>
    </matx-full-width-form-fields>
  `,
})
export class FullWidthFormFieldsDemo {}
