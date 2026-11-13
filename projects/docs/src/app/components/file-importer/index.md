`MatxFileImporter` opens the browser's file picker, reads selected files as
text, and emits their filenames and contents. It does not parse or store the
files; handle that in the consuming component.

## Demo

Choose one or more local text or JSON files to view their names and contents.

{{ NgDocActions.demo("FileImporterDemo") }}

## Usage

Call `import()` through a component reference to open the picker. Pass
`multiple: true` to allow selecting more than one file, and optionally pass
extensions (without leading dots) to filter the picker:

```ts
import { Component, viewChild } from "@angular/core";
import { File, MatxFileImporter } from "@grumptech/ngx-matx/file-importer";

@Component({
  selector: "app-import",
  imports: [MatxFileImporter],
  template: `
    <button type="button" (click)="chooseFiles()">Choose JSON files</button>
    <matx-file-importer (imported)="handleImported($event)" />
  `,
})
export class ImportComponent {
  private readonly importer = viewChild.required(MatxFileImporter);

  protected chooseFiles(): void {
    this.importer().import(true, ["json"]);
  }

  protected handleImported(files: File[]): void {
    for (const file of files) {
      console.log(file.filename, file.content);
    }
  }
}
```

## API

| Member                           | Type            | Description                                                          |
| -------------------------------- | --------------- | -------------------------------------------------------------------- |
| `import(multiple?, extensions?)` | Method          | Opens the file picker. Defaults to one file and no extension filter. |
| `imported`                       | `File[]` output | Emits the selected files after they have been read as text.          |

`File` has a `filename: string` and `content: string` property.
