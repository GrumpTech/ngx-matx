import { IExporter } from '../models';

export class ExportManagerBase<T> {
  private exportersByName = new Map<string, IExporter<T>>();

  set(exporters: IExporter<T>[]) {
    this.exportersByName.clear();
    exporters.forEach((i) => {
      this.exportersByName.set(i.name, i);
    });
  }

  getNames(): string[] {
    return [...this.exportersByName.keys()];
  }

  getFirstName(): string {
    const names = this.getNames();
    return names.length ? names[0] : '';
  }

  getExtension(exporterName: string): string {
    return this.exportersByName.get(exporterName)?.extension ?? '';
  }

  export(exporterName: string, data: T): string {
    const exporter = this.exportersByName.get(exporterName);
    if (!exporter) {
      throw new Error('ExportManager: exporter does not exist');
    }
    return exporter.export(data);
  }
}
