import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatxMenu } from '../menu/menu.component';
import { MatxMenuTriggers } from '../menu-triggers/menu-triggers.directive';
import { MenuBarItem, MenuItem, Shortcut } from '../models';

@Component({
  selector: 'matx-menu-bar',
  templateUrl: './menu-bar.component.html',
  host: {
    '(window:keydown)': 'handleKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatMenuTrigger, MatxMenu, MatxMenuTriggers],
})
export class MatxMenuBar<T = undefined> implements OnInit {
  readonly menuBar = input.required<MenuBarItem<T>[]>();
  readonly itemClick = output<MenuItem<T>>();
  readonly MATX_MENU_CLASS = 'matx-menu';
  private itemsByShortcut = new Map<string, MenuItem<T>>();

  ngOnInit() {
    const items = this.menuBar().flatMap((i) =>
      this.getMenuItemsRecursive(i.children),
    );
    let shortcuts: [string, MenuItem<T>][] = [];
    items
      .filter((i) => i.shortcuts)
      .forEach(
        (i) =>
          (shortcuts = shortcuts.concat(
            i
              .shortcuts!.filter((j) => !j.disabled)
              .map((j) => [this.shortcutToId(j), i]),
          )),
      );
    this.itemsByShortcut = new Map(shortcuts);
  }

  protected handleClick(item: MenuItem<T>) {
    this.itemClick.emit(item);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    const shortCutId = this.shortcutToId({
      ctrl: event.ctrlKey,
      alt: event.altKey,
      shift: event.shiftKey,
      keyCode: event.code,
    });
    if (
      (event.target as Element)?.closest('input,textarea') &&
      new Set<string>([
        'c-KeyX',
        'c-KeyC',
        'c-KeyV',
        'c-KeyZ',
        'c-KeyY',
        'c-s-KeyZ',
      ]).has(shortCutId)
    ) {
      return;
    }
    const item = this.itemsByShortcut.get(shortCutId);
    if (item !== undefined) {
      this.itemClick.emit(item);
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  private getMenuItemsRecursive(items: MenuItem<T>[]): MenuItem<T>[] {
    return items.flatMap((i) =>
      [i].concat(this.getMenuItemsRecursive(i.children ?? [])),
    );
  }

  private shortcutToId(shortcut: Shortcut) {
    return (
      (shortcut?.ctrl ? 'c-' : '') +
      (shortcut?.alt ? 'a-' : '') +
      (shortcut?.shift ? 's-' : '') +
      shortcut?.keyCode
    );
  }
}
