import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { MenuBarDemo } from './demo';

const MenuBar: NgDocPage = {
  title: 'Menu bar',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { MenuBarDemo },
};

export default MenuBar;
