import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { ConfirmationDialogDemo } from './demo';

const ConfirmationDialog: NgDocPage = {
  title: 'Confirmation dialog',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { ConfirmationDialogDemo },
};

export default ConfirmationDialog;
