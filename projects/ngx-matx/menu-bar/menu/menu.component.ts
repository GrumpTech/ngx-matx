import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MenuItem, Shortcut } from '../models';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'matx-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
})
export class MatxMenu<T = undefined> {
  readonly items = input<MenuItem<T>[]>([]);
  readonly class = input('');
  readonly itemClick = output<MenuItem<T>>();
  readonly menu = viewChild.required(MatMenu);

  handleClick(item: MenuItem<T>) {
    this.itemClick.emit(item);
  }

  getShortcutText(shortcuts: Shortcut[]): string {
    return shortcuts
      .filter((i) => !i.hideMenuText)
      .map(
        (i) =>
          ' -	' +
          (i.ctrl ? 'Ctrl + ' : '') +
          (i.alt ? 'Alt + ' : '') +
          (i.shift ? 'Shift + ' : '') +
          i.keyCode.replace(/^Key/, ''),
      )
      .join(', ');
  }
}
