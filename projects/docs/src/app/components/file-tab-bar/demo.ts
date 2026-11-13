import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatxFileTabBar,
  ModificationState,
  Tab,
  TabsManager,
} from '@grumptech/ngx-matx/file-tab-bar';

@Component({
  selector: 'app-file-tab-bar-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatxFileTabBar],
  providers: [TabsManager],
  template: `
    <button mat-flat-button (click)="addTab()">Add tab</button>
    <matx-file-tab-bar
      (tabSelect)="selectTab($event)"
      (tabClose)="closeTab($event)"
    />
    <p>Selected tab: {{ selectedFilename || 'none' }}</p>
  `,
})
export class FileTabBarDemo {
  protected selectedFilename = '';

  private readonly tabsManager = inject(TabsManager<Tab<string>>);
  private nextTabNumber = 1;

  constructor() {
    this.tabsManager.openTab({
      filename: 'welcome.txt',
      data: 'Welcome',
      modificationState: ModificationState.Unmodified,
    });
    this.tabsManager.openTab({
      filename: 'draft.txt',
      data: 'Draft',
      modificationState: ModificationState.Modified,
    });
    this.selectedFilename = this.tabsManager.getSelectedTab()?.filename ?? '';
  }

  protected addTab(): void {
    const number = this.nextTabNumber++;
    this.tabsManager.openNewTab({
      filename: `new-file-${number}.txt`,
      data: '',
      modificationState: ModificationState.New,
    });
    this.selectedFilename = this.tabsManager.getSelectedTab()?.filename ?? '';
  }

  protected selectTab(filename: string): void {
    const tab = this.tabsManager.getTabByFilename(filename);
    if (tab) {
      this.tabsManager.selectTab(tab);
      this.selectedFilename = filename;
    }
  }

  protected closeTab(filename: string): void {
    const tab = this.tabsManager.getTabByFilename(filename);
    if (tab) {
      this.tabsManager.closeTab(tab);
      this.selectedFilename = this.tabsManager.getSelectedTab()?.filename ?? '';
    }
  }
}
