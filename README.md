# ngx-matx

ngx-matx extends [Angular Material](https://material.angular.dev) with reusable components and utilities for Angular applications.

- [Documentation](https://grumptech.github.io/docs/ngx-matx/)
- [GitHub repository](https://github.com/GrumpTech/ngx-matx)

## Features

- Code editor
- Confirmation dialog
- Drag-and-drop tree
- Editor app with import and export support
- File explorer and file importer
- File tabs and tab management
- Full-width form fields
- Menu bar
- Overflow tooltip
- Panels
- Thin scrollbar SCSS mixin

Components are provided through package entry points. For example:

```ts
import { MatxPanel } from "@grumptech/ngx-matx/panel";
```

See the [documentation](https://grumptech.github.io/docs/ngx-matx/) for component APIs and examples.

## Requirements

- Angular 21 or later
- Angular Material 21 or later

If your application does not use Angular Material yet, install it first:

```bash
ng add @angular/material
```

## Installation

```bash
npm install @grumptech/ngx-matx
```

## Development

Clone the repository, install dependencies, and run the available scripts:

```bash
npm ci              # Install npm packages
npm run build       # Build the library
npm run test        # Run library tests
npm run build:docs  # Build the documentation site
```

Use `npx prettier . --check` to check formatting or `npx prettier . --write` to format files.

## License

[MIT](LICENSE)
