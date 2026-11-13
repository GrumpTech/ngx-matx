import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainPage),
  },
  {
    path: 'code-editor',
    loadComponent: () =>
      import('./pages/code-editor/code-editor.component').then(
        (m) => m.CodeEditorPage,
      ),
  },
  {
    path: 'drag-drop-tree',
    loadComponent: () =>
      import('./pages/drag-drop-tree/drag-drop-tree.component').then(
        (m) => m.DragDropTreePage,
      ),
  },
  {
    path: 'editor-app',
    loadComponent: () =>
      import('./pages/editor-app/editor-app.component').then(
        (m) => m.EditorAppPage,
      ),
  },
];
