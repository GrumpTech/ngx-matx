import {
  NgDocRootComponent,
  NgDocNavbarComponent,
  NgDocSidebarComponent,
} from '@ng-doc/app';
import {
  NgDocButtonIconComponent,
  NgDocTooltipDirective,
} from '@ng-doc/ui-kit';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [
    RouterOutlet,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('docs');
}
