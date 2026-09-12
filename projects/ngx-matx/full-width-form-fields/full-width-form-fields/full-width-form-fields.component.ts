import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-full-width-form-fields',
  template: ` <ng-content /> `,
  styles: [
    `
      matx-full-width-form-fields {
        mat-form-field {
          width: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatxFullWidthFormFields {}
