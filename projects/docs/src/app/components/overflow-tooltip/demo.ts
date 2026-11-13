import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatxOverflowTooltip } from '@grumptech/ngx-matx/overflow-tooltip';

@Component({
  selector: 'app-overflow-tooltip-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxOverflowTooltip],
  styles: [
    `
      .filename {
        display: block;
        width: 220px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
  template: `
    <p>Hover the truncated filename to see its full value:</p>
    <span class="filename" [matxOverflowTooltip]="filename">{{
      filename
    }}</span>
  `,
})
export class OverflowTooltipDemo {
  protected readonly filename = 'a-very-long-filename-that-does-not-fit.json';
}
