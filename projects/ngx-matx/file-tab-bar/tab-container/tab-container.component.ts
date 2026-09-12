import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'matx-file-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrl: './tab-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxFileTabContainer {}
