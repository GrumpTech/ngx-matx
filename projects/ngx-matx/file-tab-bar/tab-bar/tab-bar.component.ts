import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatxFileTabContainer } from '../tab-container/tab-container.component';
import { MatxFileTab } from '../tab/tab.component';
import { ModificationState, Tab } from '../models';
import { TabsManager } from '../tabs-manager/tabs-manager';

@Component({
  selector: 'matx-file-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
  imports: [MatxFileTabContainer, MatxFileTab, DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxFileTabBar<
  T extends { filename: string; modificationState: ModificationState },
> {
  readonly tabSelect = output<string>();
  readonly tabClose = output<string>();
  readonly tabs: Signal<T[]>;
  readonly selectedTab: Signal<T | null>;

  constructor() {
    const tabsManager = inject(TabsManager<T>);
    this.tabs = toSignal(tabsManager.onChange, { initialValue: [] });
    this.selectedTab = toSignal(tabsManager.onSelectionChange, {
      initialValue: null,
    });
  }

  protected dropTab(event: CdkDragDrop<Tab<T>[]>) {
    moveItemInArray(this.tabs(), event.previousIndex, event.currentIndex);
  }

  protected selectTab(filename: string): void {
    this.tabSelect.emit(filename);
  }

  protected closeTab(filename: string): void {
    this.tabClose.emit(filename);
  }
}
