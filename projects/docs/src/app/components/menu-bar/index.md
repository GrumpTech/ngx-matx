`MatxMenuBar<T>` renders top-level menus with nested items, icons, and keyboard
shortcuts. It emits the selected item so your application can run the
corresponding action.

## Demo

Use the File menu or the displayed keyboard shortcuts to trigger an action.

{{ NgDocActions.demo("MenuBarDemo") }}

## Usage

Define `MenuBarItem<T>[]` and handle the `itemClick` output:

```ts
import { Component } from "@angular/core";
import { MatxMenuBar, MenuBarItem, MenuItem } from "@grumptech/ngx-matx/menu-bar";

type Action = "save" | "close";

@Component({
  selector: "app-menu",
  imports: [MatxMenuBar],
  template: `<matx-menu-bar [menuBar]="menuBar" (itemClick)="run($event)" />`,
})
export class MenuComponent {
  protected readonly menuBar: MenuBarItem<Action>[] = [
    {
      text: "File",
      children: [
        {
          text: "Save",
          icon: "save",
          shortcuts: [{ ctrl: true, keyCode: "KeyS" }],
          data: "save",
        },
        { text: "Close", data: "close" },
      ],
    },
  ];

  protected run(item: MenuItem<Action>): void {
    if (item.data === "save") {
      // Run the save action.
    }
  }
}
```

Each top-level `MenuBarItem` has `text` and `children`. A `MenuItem<T>` can
contain `text`, an optional Material icon name, nested `children`, shortcut
definitions, and (when using a data type) an action `data` value.

## API

### Shortcuts

Specify `keyCode` using `KeyboardEvent.code` values, such as `KeyS` or
`Delete`. Modifier keys are optional:

| Property               | Type      |
| ---------------------- | --------- |
| `ctrl`, `alt`, `shift` | `boolean` |
| `keyCode`              | `string`  |
| `disabled`             | `boolean` |
| `hideMenuText`         | `boolean` |

`ctrl`, `alt`, and `shift` specify required modifier keys. `keyCode` uses a
`KeyboardEvent.code` value; `disabled` prevents activation and `hideMenuText`
hides the shortcut label without disabling it. Shortcuts activate the matching
item and emit `itemClick`. Common text-editing shortcuts are left to the browser
when the focus is in an input or textarea.
