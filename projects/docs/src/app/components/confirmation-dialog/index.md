A Material dialog that asks the user to confirm or cancel an action. You provide a title and a message, and the dialog returns the user's choice when it closes.

## Demo

{{ NgDocActions.demo("ConfirmationDialogDemo") }}

## Usage

Open `MatxConfirmationDialog` with Angular Material's `MatDialog` and pass a
title and message in its `data` option:

```ts
import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatxConfirmationDialog } from "@grumptech/ngx-matx/confirmation-dialog";

@Component({
  selector: "app-delete-button",
  template: `<button type="button" (click)="confirmDelete()">Delete</button>`,
})
export class DeleteButtonComponent {
  private readonly dialog = inject(MatDialog);

  protected confirmDelete(): void {
    this.dialog
      .open(MatxConfirmationDialog, {
        data: { title: "Delete item", message: "Are you sure?" },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          // Perform the confirmed action.
        }
      });
  }
}
```

## API

Pass these properties in the `data` option of `MatDialog.open()`:

| Property  | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `title`   | `string` | Heading shown at the top of the dialog |
| `message` | `string` | Text shown in the dialog body          |

`afterClosed()` emits:

| Value       | Meaning                                     |
| ----------- | ------------------------------------------- |
| `true`      | The user confirmed                          |
| `undefined` | The user cancelled, or dismissed the dialog |

Always check for a truthy value rather than comparing against `false`.
