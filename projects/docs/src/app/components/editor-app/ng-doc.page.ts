import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { EditorAppDemo } from './demo';

const EditorApp: NgDocPage = {
  title: 'Editor app',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { EditorAppDemo },
};

export default EditorApp;
