`MatxExplorer` displays files in a tree and provides operations to open, save,
rename, and delete them. It uses an `IFileService` implementation to access
files; choose a built-in provider or supply your own.

## Demo

Explore and select the sample files. The demo stores files temporarily; they
are cleared when the page is reloaded.

{{ NgDocActions.demo("ExplorerDemo") }}

## Usage

For browser-only projects, provide the local-storage implementation:

```ts
import { Component } from "@angular/core";
import { MatxExplorer, provideLocalStorageExplorer } from "@grumptech/ngx-matx/explorer";

@Component({
  selector: "app-file-explorer",
  imports: [MatxExplorer],
  providers: [provideLocalStorageExplorer("my-app-files_")],
  template: `<matx-explorer extension="json" (fileClick)="openFile($event)" />`,
})
export class FileExplorerComponent {
  protected openFile(filename: string): void {
    console.log("Selected file:", filename);
  }
}
```

`provideLocalStorageExplorer` accepts a storage-key prefix, defaulting to
`matx_explorer_`. For an HTTP-backed file service, provide
`provideExplorer(fileServiceUrl)` and configure Angular `HttpClient` in your
application. The service expects endpoints for listing, loading, saving,
renaming, and deleting files; implement `IFileService` to use another backend.
For temporary in-memory storage, use `provideTemporaryStorageExplorer()`. Its
files are cleared when the application is reloaded.

## API

### Inputs and outputs

| Name           | Type            | Default |
| -------------- | --------------- | ------- |
| `extension`    | `string`        | `""`    |
| `selectedFile` | `string`        | `""`    |
| `fileClick`    | `string` output | —       |
| `filesLoaded`  | `number` output | —       |

`extension` filters files and is used for operations, without a leading dot.
An empty value leaves filenames unchanged. `selectedFile` sets the selected
filename. `fileClick` emits the selected filename; `filesLoaded` emits the
number of files after loading or refreshing the listing.

With `extension="json"`, the explorer displays names without `.json` and
appends `.json` when accessing files through its service.

### Methods

The component also exposes methods for use through a component reference:

| Method                                             | Description                                            |
| -------------------------------------------------- | ------------------------------------------------------ |
| `refresh()`                                        | Reloads the file listing.                              |
| `collapseAll()`                                    | Collapses all tree nodes.                              |
| `getFileNames()`                                   | Returns the current displayed filenames.               |
| `openFile(filename)` / `openFiles(filenames)`      | Loads one or multiple files.                           |
| `saveFile(filename, content)` / `saveFiles(files)` | Saves one or multiple files.                           |
| `saveFileAs(filename, content, excludeFilenames?)` | Prompts for a new filename and saves the content.      |
| `renameFile(filename, excludeFilenames?)`          | Prompts to rename an existing file.                    |
| `renameNewFile(filename, excludeFilenames?)`       | Prompts for a filename without renaming a stored file. |
| `deleteFile(filename)`                             | Asks for confirmation, then deletes the file.          |

File operations return RxJS observables. A file is represented by
`{ filename: string, content: string }`; `File` and `IFileService` are exported
from `@grumptech/ngx-matx/explorer`.
