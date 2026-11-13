import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { FileTabBarDemo } from './demo';

const FileTabBar: NgDocPage = {
  title: 'File tab bar',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { FileTabBarDemo },
};

export default FileTabBar;
