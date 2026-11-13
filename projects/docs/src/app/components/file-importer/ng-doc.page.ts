import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { FileImporterDemo } from './demo';

const FileImporter: NgDocPage = {
  title: 'File importer',
  mdFile: './index.md',
  category: ComponentsCategory,
  demos: { FileImporterDemo },
};

export default FileImporter;
