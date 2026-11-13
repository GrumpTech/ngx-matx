import { NgDocPage } from '@ng-doc/core';
import StylesCategory from '../ng-doc.category';
import { ThinScrollbarsDemo } from './demo';

const ThinScrollbars: NgDocPage = {
  title: 'Thin scrollbars',
  mdFile: './index.md',
  category: StylesCategory,
  demos: { ThinScrollbarsDemo },
};

export default ThinScrollbars;
