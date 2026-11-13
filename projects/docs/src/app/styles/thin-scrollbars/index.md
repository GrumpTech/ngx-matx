The `thin-scrollbars` SCSS mixin adds a 6 px scrollbar with a rounded thumb
and track, and hides the scrollbar corner. It also sets `overflow: auto`, so
the element scrolls only when its content overflows.

## Demo

The code sample overflows in both directions. Scroll it to see the styled bars.

{{ NgDocActions.demo("ThinScrollbarsDemo") }}

## Usage

Include the mixin in the stylesheet of the element that should scroll:

```scss
@use "@grumptech/ngx-matx/thin-scrollbars";

.scrollable {
  max-height: 20rem;
  @include thin-scrollbars.scrollbars;
}
```

## API

The `scrollbars` mixin sets `overflow: auto`, a 6 px scrollbar width and
height, rounded thumb and track, and hides the scrollbar corner. The custom
thumb, track, and corner styles use WebKit scrollbar selectors; other browsers
retain their native scrollbar appearance.
