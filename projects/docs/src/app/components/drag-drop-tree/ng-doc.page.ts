import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { DragDropTreeTextDemo } from './text-demo';
import { DragDropTreeDataDemo } from './data-demo';

const DragDropTree: NgDocPage = {
  title: 'Drag drop tree',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { DragDropTreeTextDemo, DragDropTreeDataDemo },
};

export default DragDropTree;
