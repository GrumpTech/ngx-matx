import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  inject,
  input,
  DestroyRef,
  OnInit,
  Signal,
  OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver-es';
import { map, Observable } from 'rxjs';
import { MatxConfirmationDialog } from '@grumptech/ngx-matx/confirmation-dialog';
import {
  MatxFileTabBar,
  ModificationState,
  TabsManager,
} from '@grumptech/ngx-matx/file-tab-bar';
import { File, MatxExplorer } from '@grumptech/ngx-matx/explorer';
import { MatxPanel, MatxPanelHeaderButton } from '@grumptech/ngx-matx/panel';
import { MatxEditorAppImporter } from '../importer/importer.component';
import { ImportManagerBase } from '../services/import-manager';
import { ExportManagerBase } from '../services/export-manager';
import {
  Tab,
  FileCommand,
  FileCommandType,
  Result,
  NameAndData,
} from '../models';

@Component({
  selector: 'matx-editor-app',
  templateUrl: './editor-app.component.html',
  styleUrl: './editor-app.component.scss',
  imports: [
    MatxFileTabBar,
    MatxExplorer,
    MatxPanel,
    MatxPanelHeaderButton,
    MatxEditorAppImporter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxEditorApp<T> implements OnInit, OnDestroy {
  readonly convertFn = input.required<(content: string) => Result<T>>();
  readonly convertBackFn = input.required<(data: T) => string>();
  readonly extension = input('txt');
  readonly defaultContent = input('');
  readonly importManager = input<ImportManagerBase<T>>(new ImportManagerBase());
  readonly exportManager = input<ExportManagerBase<T>>(new ExportManagerBase());
  readonly onCommand = input<Observable<FileCommand>>();

  protected selectedFile: Signal<string>;
  protected readonly importerNames = signal<string[]>([]);
  protected readonly exporterNames = signal<string[]>([]);

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly tabsManager = inject(TabsManager<Tab<T>>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly explorer = viewChild.required(MatxExplorer);
  private readonly fileImporter = viewChild.required(MatxEditorAppImporter);
  private firstExplorerLoad = true;

  private get default(): T {
    if (this._default === undefined) {
      const result = this.convertFn()(this.defaultContent());
      !result.success && console.error(result.message);
      this._default = result.result;
    }
    return this._default;
  }
  private _default?: T;

  constructor() {
    this.selectedFile = toSignal(
      this.tabsManager.onSelectionChange.pipe(map((i) => i?.filename ?? '')),
      { initialValue: '' },
    );
  }

  ngOnInit(): void {
    this.onCommand()
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((i) => this.handleCommand(i));

    const convertBack = this.convertBackFn();
    if (convertBack) {
      this.tabsManager.setIsModifiedFn(
        (i) => i.content !== convertBack(i.data),
      );
    }
    this.importerNames.set(this.importManager().getNames());
    this.exporterNames.set(this.exportManager().getNames());
  }

  ngOnDestroy(): void {
    this.tabsManager.closeAllTabs();
  }

  protected handleCommand(command: FileCommand): void {
    this.snackBar.dismiss();
    switch (command.commandType) {
      case FileCommandType.FileNew:
        return this.openNewTab();
      case FileCommandType.FileImport:
        this.warnAndRun(
          'Import',
          "Your changes might be lost if you don't save them first.",
          () => this.tabsManager.hasModifiedTab(),
          () =>
            this.fileImporter().import(
              command.data ?? this.importManager().getFirstName(),
            ),
        );
        return;
    }
    const selectedTab = this.tabsManager.getSelectedTab();
    if (!selectedTab) {
      return this.showMessage('No open files.');
    }
    switch (command.commandType) {
      case FileCommandType.FileSave:
        this.explorer()
          .saveFile(
            selectedTab.filename,
            this.convertBackFn()(selectedTab.data),
          )
          .subscribe(() =>
            this.tabsManager.updateModified(
              [selectedTab],
              ModificationState.Unmodified,
            ),
          );
        break;
      case FileCommandType.FileSaveAs:
        this.explorer()
          .saveFileAs(
            selectedTab.filename,
            this.convertBackFn()(selectedTab.data),
            this.tabsManager.getFileNames(),
          )
          .subscribe((newFilename: string) =>
            this.tabsManager.update(selectedTab, {
              filename: newFilename,
              modificationState: ModificationState.Unmodified,
            }),
          );
        break;
      case FileCommandType.FileSaveAll:
        const tabs = this.tabsManager.getTabs();
        this.explorer()
          .saveFiles(
            tabs.map((i) => ({
              filename: i.filename,
              content: this.convertBackFn()(i.data),
            })),
          )
          .subscribe(() =>
            this.tabsManager.updateModified(tabs, ModificationState.Unmodified),
          );
        break;
      case FileCommandType.FileRename:
        if (selectedTab.modificationState === ModificationState.New) {
          this.explorer()
            .renameNewFile(
              selectedTab.filename,
              this.tabsManager.getFileNames(),
            )
            .subscribe((newFilename) =>
              this.tabsManager.update(selectedTab, { filename: newFilename }),
            );
        } else {
          this.explorer()
            .renameFile(selectedTab.filename, this.tabsManager.getFileNames())
            .subscribe((newFilename) =>
              this.tabsManager.update(selectedTab, { filename: newFilename }),
            );
        }
        break;
      case FileCommandType.FileDelete:
        if (selectedTab.modificationState === ModificationState.New) {
          this.tryCloseTab(selectedTab.filename);
          break;
        }
        this.explorer()
          .deleteFile(selectedTab.filename)
          .subscribe(() => {
            const tab = this.tabsManager.getTabByFilename(selectedTab.filename);
            tab && this.tabsManager.closeTab(tab);
          });
        break;
      case FileCommandType.FileClose:
        this.tryCloseTab(selectedTab.filename);
        break;
      case FileCommandType.FileCloseAll:
        this.warnAndRun(
          'Close all',
          "Your changes will be lost if you don't save them first.",
          () => this.tabsManager.hasModifiedTab(),
          () => this.tabsManager.closeAllTabs(),
        );
        break;
      case FileCommandType.FileExport:
        const exporter = command.data ?? this.exportManager().getFirstName();
        const data = new Blob(
          [this.exportManager().export(exporter, selectedTab.data) ?? ''],
          { type: 'text/plain;charset=utf-8' },
        );
        saveAs(
          data,
          `${selectedTab.filename}.${this.exportManager().getExtension(exporter)}`,
        );
        break;
    }
  }

  protected selectTabOrOpenFile(filename: string): void {
    const tab = this.tabsManager.getTabByFilename(filename);
    if (tab) {
      this.tabsManager.selectTab(tab);
    } else {
      this.explorer()
        .openFile(filename)
        .subscribe((content) => this.openTabFromFile({ filename, content }));
    }
  }

  protected addTabOnEmptyFirstLoad(nFiles: number): void {
    if (this.firstExplorerLoad) {
      !nFiles && this.openNewTab();
      this.firstExplorerLoad = false;
    }
  }

  protected selectTab(filename: string) {
    const tab = this.tabsManager.getTabByFilename(filename);
    tab && this.tabsManager.selectTab(tab);
  }

  protected tryCloseTab(filename: string): void {
    const tab = this.tabsManager.getTabByFilename(filename);
    if (tab) {
      this.warnAndRun(
        'Close',
        "Your changes will be lost if you don't save them first.",
        () => tab.modificationState !== ModificationState.Unmodified,
        () => this.tabsManager.closeTab(tab),
      );
    }
  }

  protected handleImported(data: NameAndData<T>[]): void {
    this.explorer()
      .openFiles(data.map((i) => i.name))
      .subscribe((files) => {
        const contentByName = new Map(
          files.map((i) => [i.filename, i.content]),
        );
        const tabs = data.map((i) => {
          const content = contentByName.get(i.name);
          return {
            filename: i.name,
            content: content ?? '',
            data: i.data,
            modificationState: content
              ? ModificationState.Unknown
              : ModificationState.New,
          };
        });
        this.tabsManager.importTabs(tabs);
      });
  }

  private openTabFromFile(file: File): void {
    const result = this.convertFn()(file.content);
    if (result.success) {
      this.tabsManager.openTab({
        filename: file.filename,
        content: file.content,
        data: result.result,
        modificationState: ModificationState.Unmodified,
      });
    } else {
      const warning = 'Could not parse file.';
      console.warn(warning, result.message);
      this.showMessage(warning);
    }
  }

  private openNewTab(): void {
    this.tabsManager.openNewTab(
      {
        filename: 'new',
        content: this.defaultContent(),
        data: this.default,
        modificationState: ModificationState.New,
      },
      this.explorer().getFileNames(),
    );
  }

  private warnAndRun(
    title: string,
    message: string,
    showWarningFn: () => boolean,
    fn: () => void,
  ) {
    if (!showWarningFn()) {
      return fn();
    }
    this.dialog
      .open(MatxConfirmationDialog, {
        data: {
          title: title,
          message: message,
        },
      })
      .afterClosed()
      .subscribe((result) => result && fn());
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'X');
  }
}
