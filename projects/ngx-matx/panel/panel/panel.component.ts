import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatxOverflowTooltip } from '@grumptech/ngx-matx/overflow-tooltip';

@Component({
  selector: 'matx-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardHeader, MatCardContent, MatxOverflowTooltip],
})
export class MatxPanel {
  readonly headerTitle = input<string>('');
  readonly fullHeight = input(false);
}
