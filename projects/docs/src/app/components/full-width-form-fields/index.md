`MatxFullWidthFormFields` is a content wrapper that makes Angular Material
`mat-form-field` elements inside it span the full available width.

## Demo

Both form fields expand to fill the available width.

{{ NgDocActions.demo("FullWidthFormFieldsDemo") }}

## Usage

Import the standalone component and wrap the fields you want to expand:

```ts
import { Component } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatxFullWidthFormFields } from "@grumptech/ngx-matx/full-width-form-fields";

@Component({
  selector: "app-settings",
  imports: [MatFormFieldModule, MatInputModule, MatxFullWidthFormFields],
  template: `
    <matx-full-width-form-fields>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput />
      </mat-form-field>
    </matx-full-width-form-fields>
  `,
})
export class SettingsComponent {}
```

## API

`MatxFullWidthFormFields` has no inputs or outputs. It sets contained
`mat-form-field` elements to full width. Include the relevant Angular Material
form-field and input modules in your component or application as usual.
