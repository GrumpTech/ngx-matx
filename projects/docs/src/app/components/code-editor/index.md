`MatxCodeEditor` is a simple code editor. It can format incoming data and validate edits, showing a message when the current text is invalid.

## Demo

Edit the JSON. Valid changes update the status; invalid JSON displays a warning.

{{ NgDocActions.demo("CodeEditorDemo") }}

## Usage

Import `CodeEditor` and provide the initial text. A validator can be used to
show feedback and emit only valid edits:

```ts
import { Component } from "@angular/core";
import { CodeEditor } from "@grumptech/ngx-matx/code-editor";

@Component({
  selector: "app-json-editor",
  imports: [CodeEditor],
  template: ` <matx-code-editor [data]="json" [validator]="validateJson" (validChange)="saveJson($event)" /> `,
})
export class JsonEditorComponent {
  protected readonly json = "{}";

  protected validateJson(value: string) {
    try {
      JSON.parse(value);
      return { valid: true, message: "" };
    } catch {
      return { valid: false, message: "Enter valid JSON." };
    }
  }

  protected saveJson(value: string): void {
    console.log("Valid JSON:", value);
  }
}
```

`validChange` is debounced by 200 ms and emits only when a validator is provided
and the edited value is valid. Invalid edits display the validator's message.

## API

### Inputs

| Input       | Type        | Default  |
| ----------- | ----------- | -------- |
| `data`      | `string`    | Required |
| `disabled`  | `boolean`   | `false`  |
| `formatter` | `Formatter` | Not set  |
| `validator` | `Validator` | Not set  |

`data` supplies the initial or updated editor content. When `data` changes,
`formatter` can format it before it appears in the editor. `disabled` prevents
editing. `validator` checks edits and provides the warning message for invalid
text.

The function types are:

```ts
type Formatter = (data: string) => string;
type Validator = (data: string) => {
  valid: boolean;
  message: string;
};
```

### Output and method

| Name          | Type            |
| ------------- | --------------- |
| `validChange` | `string` output |
| `getData()`   | `string` method |

`validChange` emits valid edited content when a validator is provided. It is
debounced by 200 ms. Use `getData()` through a `ViewChild` query to read the
current editor content at any time.
