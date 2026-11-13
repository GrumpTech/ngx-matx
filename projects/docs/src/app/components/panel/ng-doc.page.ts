import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { PanelDemo } from './demo';

const Panel: NgDocPage = {
  title: 'Panel',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { PanelDemo },
};

export default Panel;
