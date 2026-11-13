import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  IFileService,
  MatxExplorer,
  provideTemporaryStorageExplorer,
} from '@grumptech/ngx-matx/explorer';

@Component({
  selector: 'app-explorer-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxExplorer],
  providers: [provideTemporaryStorageExplorer()],
  template: `
    <matx-explorer
      extension="txt"
      [selectedFile]="selectedFile()"
      (fileClick)="selectedFile.set($event)"
    />
    <p>Selected file: {{ selectedFile() || 'none' }}</p>
  `,
})
export class ExplorerDemo {
  protected readonly selectedFile = signal('');

  constructor() {
    const fileService = inject(IFileService);
    fileService.save('welcome.txt', '').subscribe();
    fileService.save('readme.txt', '').subscribe();
    fileService.save('guides/getting-started.txt', '').subscribe();
  }
}
