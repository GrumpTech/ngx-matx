`MatxPanel` wraps content in an Angular Material card with an optional title
and a content area. Use `MatxPanelHeaderButton` to place icon buttons in the
header.

## Demo

Click the refresh button in the panel header.

{{ NgDocActions.demo("PanelDemo") }}

## Usage

```ts
import { Component } from "@angular/core";
import { MatxPanel, MatxPanelHeaderButton } from "@grumptech/ngx-matx/panel";

@Component({
  selector: "app-files-panel",
  imports: [MatxPanel, MatxPanelHeaderButton],
  template: `
    <matx-panel headerTitle="Files" [fullHeight]="true">
      <matx-panel-header-button icon="refresh" tooltip="Refresh files" (click)="refresh()" />
      <p>Panel content goes here.</p>
    </matx-panel>
  `,
})
export class FilesPanelComponent {
  protected refresh(): void {
    // Refresh the file list.
  }
}
```

`MatxPanel` projects its regular children into the body and
`matx-panel-header-button` children into the header. Its title automatically
uses the overflow tooltip when it does not fit.

## API

### `MatxPanel`

| Input         | Type      | Default |
| ------------- | --------- | ------- |
| `headerTitle` | `string`  | `""`    |
| `fullHeight`  | `boolean` | `false` |

`headerTitle` displays a title in the panel header. `fullHeight` applies the
panel's full-height layout styles.

### `MatxPanelHeaderButton`

| Input      | Type      | Default  |
| ---------- | --------- | -------- |
| `icon`     | `string`  | Required |
| `tooltip`  | `string`  | Required |
| `selected` | `boolean` | `false`  |
| `disabled` | `boolean` | `false`  |

`icon` is a Material icon name; `tooltip` is shown for the button. `selected`
applies the selected visual style and `disabled` disables the button. The
header button has no component outputs; handle its native `click` event.
