import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FileCommand,
  FileCommandType,
  MatxEditorApp,
  Result,
  Tab,
} from '@grumptech/ngx-matx/editor-app';
import { provideLocalStorageExplorer } from '@grumptech/ngx-matx/explorer';
import { TabsManager } from '@grumptech/ngx-matx/file-tab-bar';
import {
  MatxMenuBar,
  MenuBarItem,
  MenuItem,
} from '@grumptech/ngx-matx/menu-bar';
import { filter, Observable, Subject } from 'rxjs';

@Component({
  selector: 'editor-app',
  templateUrl: './editor-app.component.html',
  styleUrl: './editor-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxEditorApp, MatxMenuBar],
  providers: [provideLocalStorageExplorer('matx_')],
})
export class EditorAppPage {
  protected menuBar: MenuBarItem<FileCommand>[];
  protected tabs: Signal<Tab<string>[]>;
  protected selectedTab: Signal<Tab<string> | null>;
  protected readonly onCommand: Observable<FileCommand>;

  private tabsManager = inject(TabsManager<Tab<string>>);
  private readonly command = new Subject<FileCommand>();

  constructor() {
    this.menuBar = this.getMenuBar();
    this.onCommand = this.command.pipe(filter((i) => i instanceof FileCommand));
    this.tabs = toSignal(this.tabsManager.onChange, { initialValue: [] });
    this.selectedTab = toSignal(this.tabsManager.onSelectionChange, {
      initialValue: null,
    });
  }

  protected convertFn(value: string): Result<string> {
    return { success: true, message: '', result: value };
  }

  protected convertBackFn(value: string) {
    return value;
  }

  protected handleClick(item: MenuItem<FileCommand>) {
    this.command.next(item.data);
  }

  private getMenuBar(): MenuBarItem<FileCommand>[] {
    return [
      {
        text: 'File',
        children: [
          {
            text: 'New',
            icon: 'note_add',
            shortcuts: [{ ctrl: true, alt: true, keyCode: 'KeyN' }],
            data: new FileCommand(FileCommandType.FileNew),
          },
          {
            text: 'Save',
            icon: 'save',
            shortcuts: [{ ctrl: true, keyCode: 'KeyS' }],
            data: new FileCommand(FileCommandType.FileSave),
          },
          {
            text: 'Save as...',
            icon: 'save_as',
            shortcuts: [{ ctrl: true, alt: true, keyCode: 'KeyS' }],
            data: new FileCommand(FileCommandType.FileSaveAs),
          },
          {
            text: 'Save all',
            icon: '',
            shortcuts: [{ ctrl: true, shift: true, keyCode: 'KeyS' }],
            data: new FileCommand(FileCommandType.FileSaveAll),
          },
          {
            text: 'Rename',
            icon: 'edit',
            shortcuts: [{ ctrl: true, keyCode: 'KeyR' }],
            data: new FileCommand(FileCommandType.FileRename),
          },
          {
            text: 'Delete',
            icon: 'delete',
            shortcuts: [{ ctrl: true, keyCode: 'Delete' }],
            data: new FileCommand(FileCommandType.FileDelete),
          },
          {
            text: 'Close',
            icon: 'close',
            shortcuts: [{ ctrl: true, keyCode: 'KeyQ' }],
            data: new FileCommand(FileCommandType.FileClose),
          },
          {
            text: 'Close all',
            icon: '',
            shortcuts: [{ ctrl: true, shift: true, keyCode: 'KeyQ' }],
            data: new FileCommand(FileCommandType.FileCloseAll),
          },
        ],
      },
    ];
  }
}
