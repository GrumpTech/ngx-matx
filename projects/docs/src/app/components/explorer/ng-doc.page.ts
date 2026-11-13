import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { ExplorerDemo } from './demo';

const Explorer: NgDocPage = {
  title: 'Explorer',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { ExplorerDemo },
};

export default Explorer;
