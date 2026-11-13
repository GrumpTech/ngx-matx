import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { CodeEditorDemo } from './demo';

const CodeEditorPage: NgDocPage = {
  title: 'Code editor',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { CodeEditorDemo },
};

export default CodeEditorPage;
