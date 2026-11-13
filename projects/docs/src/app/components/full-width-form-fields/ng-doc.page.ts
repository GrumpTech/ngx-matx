import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { FullWidthFormFieldsDemo } from './demo';

const FullWidthFormFields: NgDocPage = {
  title: 'Full width form fields',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { FullWidthFormFieldsDemo },
};

export default FullWidthFormFields;
