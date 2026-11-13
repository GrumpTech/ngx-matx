import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MatxMenuBar,
  MenuBarItem,
  MenuItem,
} from '@grumptech/ngx-matx/menu-bar';

type DemoAction = 'new' | 'save' | 'close' | 'undo' | 'redo';

@Component({
  selector: 'app-menu-bar-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxMenuBar],
  template: `
    <matx-menu-bar [menuBar]="menuBar" (itemClick)="runAction($event)" />
    <p>Last action: {{ lastAction() }}</p>
  `,
})
export class MenuBarDemo {
  protected readonly lastAction = signal('none');
  protected readonly menuBar: MenuBarItem<DemoAction>[] = [
    {
      text: 'File',
      children: [
        {
          text: 'New',
          icon: 'note_add',
          shortcuts: [{ ctrl: true, alt: true, keyCode: 'KeyN' }],
          data: 'new',
        },
        {
          text: 'Save',
          icon: 'save',
          shortcuts: [{ ctrl: true, keyCode: 'KeyS' }],
          data: 'save',
        },
        { text: 'Close', icon: 'close', data: 'close' },
      ],
    },
    {
      text: 'Edit',
      children: [
        {
          text: 'Undo',
          shortcuts: [{ ctrl: true, keyCode: 'KeyZ' }],
          data: 'undo',
        },
        {
          text: 'Redo',
          shortcuts: [{ ctrl: true, keyCode: 'KeyY' }],
          data: 'redo',
        },
      ],
    },
  ];

  protected runAction(item: MenuItem<DemoAction>): void {
    this.lastAction.set(item.text);
  }
}
