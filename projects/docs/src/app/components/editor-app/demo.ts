import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  FileCommand,
  FileCommandType,
  MatxEditorApp,
  Result,
  Tab,
} from '@grumptech/ngx-matx/editor-app';
import { provideTemporaryStorageExplorer } from '@grumptech/ngx-matx/explorer';
import { TabsManager } from '@grumptech/ngx-matx/file-tab-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editor-app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatxEditorApp],
  providers: [provideTemporaryStorageExplorer()],
  template: `
    <button mat-flat-button (click)="newFile()">New file</button>
    <button mat-button (click)="saveFile()">Save</button>
    <matx-editor-app
      [convertFn]="convert"
      [convertBackFn]="convertBack"
      extension="txt"
      defaultContent="Start writing..."
      [onCommand]="commands"
    >
      @if (selectedTab(); as tab) {
        <textarea
          aria-label="Editor content"
          rows="8"
          [value]="tab.data"
          (input)="updateContent($event)"
          style="box-sizing: border-box; width: 100%;"
        ></textarea>
      } @else {
        <p>Choose a file or create a new one to start editing.</p>
      }
    </matx-editor-app>
  `,
})
export class EditorAppDemo {
  protected readonly commands = new Subject<FileCommand>();
  protected readonly selectedTab = signal<Tab<string> | null>(null);

  private readonly tabsManager = inject(TabsManager<Tab<string>>);

  constructor() {
    this.tabsManager.onSelectionChange.subscribe((tab) =>
      this.selectedTab.set(tab),
    );
  }

  protected convert(content: string): Result<string> {
    return { success: true, message: '', result: content };
  }

  protected convertBack(content: string): string {
    return content;
  }

  protected newFile(): void {
    this.commands.next(new FileCommand(FileCommandType.FileNew));
  }

  protected saveFile(): void {
    this.commands.next(new FileCommand(FileCommandType.FileSave));
  }

  protected updateContent(event: Event): void {
    const tab = this.selectedTab();
    if (tab) {
      this.tabsManager.update(tab, {
        data: (event.target as HTMLTextAreaElement).value,
      });
    }
  }
}
