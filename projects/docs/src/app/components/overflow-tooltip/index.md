`MatxOverflowTooltip` shows a Material tooltip only when the host element's
text overflows its available width. It observes the element's size and updates
the tooltip state when the element is resized.

## Demo

Hover the truncated filename to see the tooltip.

{{ NgDocActions.demo("OverflowTooltipDemo") }}

## Usage

Import the directive and bind the tooltip message:

```ts
import { Component } from "@angular/core";
import { MatxOverflowTooltip } from "@grumptech/ngx-matx/overflow-tooltip";

@Component({
  selector: "app-file-name",
  imports: [MatxOverflowTooltip],
  template: `
    <span class="file-name" [matxOverflowTooltip]="filename">
      {{ filename }}
    </span>
  `,
  styles: [
    `
      .file-name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class FileNameComponent {
  protected readonly filename = "a-long-file-name-that-may-not-fit.json";
}
```

The host must be constrained and styled to overflow horizontally (for example
with `overflow: hidden` and `white-space: nowrap`) for the tooltip to appear.

## API

| Input                 | Type     | Description                                              |
| --------------------- | -------- | -------------------------------------------------------- |
| `matxOverflowTooltip` | `string` | Tooltip message to show when the host content overflows. |

The directive extends Angular Material's `MatTooltip`; its standard tooltip
options remain available.
