import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Navigation } from './components/navigation/navigation.component';
import { MenuItem } from './components/navigation/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButton, Navigation],
})
export class AppComponent {
  protected menu: MenuItem[] = [
    { name: 'Code editor', url: 'code-editor', children: [] },
    { name: 'Drag drop tree', url: 'drag-drop-tree', children: [] },
    { name: 'Editor', url: 'editor-app', children: [] },
  ];
}
