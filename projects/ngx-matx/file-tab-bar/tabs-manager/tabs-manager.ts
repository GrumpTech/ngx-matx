import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, Subject } from 'rxjs';
import { ModificationState } from '../models';

@Injectable({ providedIn: 'root' })
export class TabsManager<
  T extends { filename: string; modificationState: ModificationState },
> implements OnDestroy {
  readonly onChange: Observable<T[]>;
  readonly onSelectionChange: Observable<T | null>;

  private tabs: T[] = [];
  private selectedTab: T | null = null;
  private change = new BehaviorSubject<T[]>([]);
  private selectionChange = new BehaviorSubject<T | null>(null);
  private modified = new Subject<void>();
  private isModifiedFn: ((tab: T) => boolean) | undefined;

  constructor() {
    this.onChange = this.change.asObservable();
    this.onSelectionChange = this.selectionChange.asObservable();
    this.modified.pipe(debounceTime(500)).subscribe(() => {
      const isModifiedFn = this.isModifiedFn;
      if (!isModifiedFn) {
        return;
      }
      this.tabs.forEach((i) => {
        if (i.modificationState === ModificationState.Unknown) {
          i.modificationState = isModifiedFn(i)
            ? ModificationState.Modified
            : ModificationState.Unmodified;
        }
      });
      this.change.next(this.tabs.slice());
    });
  }

  ngOnDestroy(): void {
    this.change.complete();
    this.selectionChange.complete();
    this.modified.complete();
  }

  setIsModifiedFn(isModifiedFn: (tab: T) => boolean) {
    this.isModifiedFn = isModifiedFn;
  }

  hasModifiedTab(): boolean {
    return this.tabs.some(
      (i) => i.modificationState !== ModificationState.Unmodified,
    );
  }

  selectTab(tab: T): void {
    this.selectedTab = tab;
    this.selectionChange.next(this.selectedTab);
  }

  getTabs(): T[] {
    return this.tabs;
  }

  getSelectedTab(): T | null {
    return this.selectedTab;
  }

  getFileNames(): string[] {
    return this.tabs.map((i) => i.filename);
  }

  getTabByFilename(filename: string): T | undefined {
    return this.tabs.find((i) => i.filename == filename);
  }

  openNewTab(tab: T, excludeFilenames: string[] = []): void {
    const filenameLowerCase = tab.filename.toLowerCase();
    const filenames = new Set(
      this.tabs
        .map((i) => i.filename.toLowerCase())
        .concat(excludeFilenames.map((i) => i.toLowerCase())),
    );
    if (filenames.has(filenameLowerCase)) {
      let i = 1;
      while (filenames.has(`${filenameLowerCase}-${++i}`));
      tab = { ...tab, filename: `${tab.filename}-${i}` };
    }
    this.tabs.push(tab);
    this.selectedTab = tab;
    this.triggerEvents();
  }

  openTab(tab: T): void {
    const filenameLowerCase = tab.filename.toLowerCase();
    const openTab = this.tabs.find(
      (i) => filenameLowerCase === i.filename.toLowerCase(),
    );
    if (openTab) {
      this.selectedTab = openTab;
    } else {
      this.tabs.push(tab);
      this.selectedTab = tab;
    }
    this.triggerEvents();
  }

  importTabs(tabs: T[]): void {
    if (!tabs.length) {
      return;
    }
    const tabIndexByFilename = new Map(
      this.tabs.map((i, index) => [i.filename.toLowerCase(), index]),
    );
    tabs.forEach((i) => {
      const index = tabIndexByFilename.get(i.filename.toLowerCase());
      if (index !== undefined) {
        this.tabs[index] = i;
      } else {
        this.tabs.push(i);
      }
    });
    this.selectedTab = tabs[0];
    this.triggerEvents();
  }

  updateModified(tabs: T[], modified: ModificationState): void {
    if (tabs.length) {
      tabs.forEach((i) => (i.modificationState = modified));
      this.triggerEvents();
    }
  }

  update(tab: T, data: Partial<T>): void {
    if (data.filename) {
      const filename = data.filename.toLowerCase();
      if (filename !== tab.filename.toLowerCase()) {
        if (this.tabs.some((i) => i.filename.toLowerCase() === filename)) {
          throw 'tabs-manager: filename already exist';
        }
      }
    }
    Object.assign(tab, data);
    this.triggerEvents();
  }

  closeTab(tab: T) {
    const isTabSelected = tab === this.selectedTab;
    const index = this.tabs.indexOf(tab);
    this.tabs.splice(index, 1);
    if (this.tabs.length === 0) {
      this.selectedTab = null;
    } else if (isTabSelected) {
      this.selectedTab = this.tabs[Math.min(index, this.tabs.length - 1)];
    }
    this.triggerEvents();
  }

  closeAllTabs(): void {
    this.selectedTab = null;
    this.tabs.splice(0);
    this.triggerEvents();
  }

  private triggerEvents(): void {
    this.selectionChange.next(this.selectedTab);
    this.change.next(this.tabs.slice());
    this.isModifiedFn && this.modified.next();
  }
}
