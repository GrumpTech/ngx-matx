`MatxFileTabBar<T>` renders tabs from `TabsManager<T>`, showing each
filename, its selected state, and an indicator for modified or new files.
Selecting and closing tabs emit events for your application to handle.

## Demo

Select or close the sample tabs, or create a new tab.

{{ NgDocActions.demo("FileTabBarDemo") }}

## Usage

The manager is provided in the root injector. Inject the same
`TabsManager<Tab<T>>` in the component that creates or updates your tabs and
the tab bar will reflect those changes:

```ts
import { Component, inject } from "@angular/core";
import { MatxFileTabBar, ModificationState, Tab, TabsManager } from "@grumptech/ngx-matx/file-tab-bar";

@Component({
  selector: "app-editor-tabs",
  imports: [MatxFileTabBar],
  template: ` <matx-file-tab-bar (tabSelect)="selectTab($event)" (tabClose)="closeTab($event)" /> `,
})
export class EditorTabsComponent {
  private readonly tabs = inject(TabsManager<Tab<string>>);

  protected openExample(): void {
    this.tabs.openTab({
      filename: "notes",
      data: "Hello",
      modificationState: ModificationState.Unmodified,
    });
  }

  protected selectTab(filename: string): void {
    const tab = this.tabs.getTabByFilename(filename);
    if (tab) this.tabs.selectTab(tab);
  }

  protected closeTab(filename: string): void {
    const tab = this.tabs.getTabByFilename(filename);
    if (tab) this.tabs.closeTab(tab);
  }
}
```

The `Tab<T>` model contains `filename`, your `data`, and a
`ModificationState`. Use `openTab` or `openNewTab` to add tabs and the manager's
selection and close methods to respond to the outputs.

## API

| Output      | Type     |
| ----------- | -------- |
| `tabSelect` | `string` |
| `tabClose`  | `string` |

`tabSelect` emits the selected tab's filename. `tabClose` emits the filename
of the tab whose close button was clicked. `ModificationState` values are
`New`, `Unmodified`, `Modified`, and `Unknown`. The bar reflects state; it
does not itself close tabs when `tabClose` fires.
