import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { OverflowTooltipDemo } from './demo';

const OverflowTooltip: NgDocPage = {
  title: 'Overflow tooltip',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { OverflowTooltipDemo },
};

export default OverflowTooltip;
