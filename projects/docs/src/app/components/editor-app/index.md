`MatxEditorApp<T>` provides a file explorer, editor tabs, and file operations
for an application-specific editor. It manages file contents as strings and
uses the conversion functions to translate between those strings and your
editor's data model `T`. The actual editor UI is supplied by your application
through content projection.

## Demo

The demo provides temporary in-memory files and a simple text editor. Use the
buttons to create and save files; they are cleared when the page is reloaded.

{{ NgDocActions.demo("EditorAppDemo") }}

## Usage

Import `MatxEditorApp` from `@grumptech/ngx-matx/editor-app`. Configure an
explorer provider for the files your app should manage. For example, the
following uses the local-storage explorer:

```ts
import { Component } from "@angular/core";
import { MatxEditorApp } from "@grumptech/ngx-matx/editor-app";
import { provideLocalStorageExplorer } from "@grumptech/ngx-matx/explorer";

@Component({
  selector: "app-editor",
  imports: [MatxEditorApp],
  providers: [provideLocalStorageExplorer("my-editor_")],
  template: `
    <matx-editor-app [convertFn]="convert" [convertBackFn]="convertBack" extension="json" defaultContent="{}">
      <!-- Place your editor UI here. -->
    </matx-editor-app>
  `,
})
export class EditorComponent {
  protected convert(content: string) {
    try {
      return { success: true, message: "", result: JSON.parse(content) };
    } catch (error) {
      return {
        success: false,
        message: String(error),
        result: {},
      };
    }
  }

  protected convertBack(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }
}
```

`convertFn` must return a `Result<T>` with `success`, `message`, and `result`
properties. When a file cannot be parsed, return `success: false` and an
explanatory message. `convertBackFn` serializes the editor data when a file is
saved. The example uses `{}` as the fallback result; replace it with a value
that matches your editor's data model.

For in-memory files that are cleared when the application is reloaded, use
`provideTemporaryStorageExplorer()`. To persist files in the browser, use
`provideLocalStorageExplorer(prefix)`.

The projected editor UI is not automatically bound to the selected tab. Use
`TabsManager` from `@grumptech/ngx-matx/file-tab-bar` and `Tab<T>` from
`@grumptech/ngx-matx/editor-app` to observe tab changes and connect your
editor to the selected tab's `data`.

### File commands

`MatxEditorApp` handles operations through its optional `onCommand` input,
which accepts an `Observable<FileCommand>`. Create commands using
`FileCommand` and `FileCommandType` from `@grumptech/ngx-matx/editor-app`:

```ts
import { FileCommand, FileCommandType } from "@grumptech/ngx-matx/editor-app";
import { Subject } from "rxjs";

export class EditorComponent {
  protected readonly commands = new Subject<FileCommand>();

  protected newFile(): void {
    this.commands.next(new FileCommand(FileCommandType.FileNew));
  }
}
```

Bind it with `[onCommand]="commands"` and send commands for the desired
operations:

| Command                                 | Behavior                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| `FileNew`                               | Opens a new tab using `defaultContent`.                                      |
| `FileSave`, `FileSaveAs`, `FileSaveAll` | Saves the selected file, saves it under a new name, or saves all open files. |
| `FileRename`, `FileDelete`              | Renames or deletes the selected file.                                        |
| `FileClose`, `FileCloseAll`             | Closes the selected tab or all tabs.                                         |
| `FileImport`                            | Opens the importer.                                                          |
| `FileExport`                            | Exports the selected tab.                                                    |

For `FileImport` and `FileExport`, set `FileCommand.data` to the configured
importer or exporter name. If omitted, the first registered importer or
exporter is used. Closing modified tabs and importing over modified files
prompts for confirmation.

### Import and export

Create `ImportManagerBase<T>` and `ExportManagerBase<T>` instances and register
your implementations with their `set` methods. Then pass the managers to the
component:

```html
<matx-editor-app [convertFn]="convert" [convertBackFn]="convertBack" [importManager]="importManager" [exportManager]="exportManager" [onCommand]="commands" />
```

For example, call `importManager.set([myImporter])` and
`exportManager.set([myExporter])` after creating the managers. The example
assumes those instances are available as `importManager` and `exportManager`
in the component.

Implement `IImporter<T>` to define an importer's name, accepted extensions,
whether it supports multiple file selection, and its asynchronous `import`
function. Implement `IExporter<T>` to define an exporter's name, output
extension, and `export` function. Both interfaces and manager classes are
exported from `@grumptech/ngx-matx/editor-app`.

## API

### Inputs

| Input            | Type                             | Default       |
| ---------------- | -------------------------------- | ------------- |
| `convertFn`      | `(content: string) => Result<T>` | Required      |
| `convertBackFn`  | `(data: T) => string`            | Required      |
| `extension`      | `string`                         | `"txt"`       |
| `defaultContent` | `string`                         | `""`          |
| `importManager`  | `ImportManagerBase<T>`           | Empty manager |
| `exportManager`  | `ExportManagerBase<T>`           | Empty manager |
| `onCommand`      | `Observable<FileCommand>`        | Not set       |

`convertFn` parses file text into editor data; `convertBackFn` serializes data
when saving. `extension` and `defaultContent` configure new files.
`importManager` and `exportManager` provide importers and exporters.
`onCommand` receives file commands.
