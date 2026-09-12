import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatIcon } from '@angular/material/icon';

interface Path {
  name: string;
  fullName: string;
  level: number;
  children?: Path[];
}

@Component({
  selector: 'matx-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatTreeModule],
})
export class MatxFileTree implements OnChanges {
  readonly filenames = input<string[]>([]);
  readonly selectedFile = input('');
  readonly fileClick = output<string>();

  protected readonly data = signal<Path[]>([]);
  private readonly tree = viewChild.required(MatTree);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filenames']) {
      this.toNodes();
    }
    if (changes['selectedFile']) {
      this.expandParents(changes['selectedFile'].currentValue);
    }
  }

  collapseAll(): void {
    this.tree().collapseAll();
  }

  protected hasChild(_: number, node: Path): boolean {
    return node.children !== undefined && node.children.length > 0;
  }

  protected childrenAccessor(node: Path): Path[] {
    return node.children ?? [];
  }

  protected expansionKeyFn(node: Path): string {
    return node.fullName;
  }

  protected handleClick(filename: string): void {
    this.fileClick.emit(filename);
  }

  private toNodes() {
    const paths = new Map<string, Path>();
    const directories = new Set<string>(
      this.filenames().flatMap((i) =>
        [...i.matchAll(/[\/]/g)].map((j) => i.substring(0, j.index)),
      ),
    );
    directories.forEach((i) => {
      const pos = i.lastIndexOf('/');
      paths.set(i, {
        name: pos === -1 ? i : i.slice(pos + 1),
        fullName: i,
        level: (i.match(/\//g) || []).length,
        children: [],
      });
    });
    const data: Path[] = [];
    paths.forEach((path, key) => {
      if (path.level === 0) {
        data.push(path);
      } else {
        const pos = key.lastIndexOf('/');
        paths.get(key.slice(0, pos))?.children?.push(path);
      }
    });
    this.filenames().forEach((i) => {
      const pos = i.lastIndexOf('/');
      const path = {
        name: pos === -1 ? i : i.slice(pos + 1),
        fullName: i,
        level: (i.match(/\//g) || []).length,
      };
      if (path.level === 0) {
        data.push(path);
      } else {
        paths.get(i.slice(0, pos))?.children?.push(path);
      }
    });
    paths.forEach((path) => {
      path.children?.sort((x, y) => this.comparePaths(x, y));
    });
    this.data.set(data.sort((x, y) => this.comparePaths(x, y)));
  }

  private comparePaths(x: Path, y: Path): number {
    if (x.children && !y.children) {
      return -1;
    }
    if (y.children && !x.children) {
      return 1;
    }
    return this.localCompareNumeric(x.name, y.name);
  }

  private localCompareNumeric(x: string, y: string) {
    return x.localeCompare(y, undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }

  private expandParents(filename: string): void {
    const directories = [...filename.matchAll(/[\/]/g)].map((i) =>
      filename.substring(0, i.index),
    );
    let nodes = this.data();
    for (let level = 0; level < directories.length; level++) {
      const node = nodes.find((i) => i.fullName === directories[level]);
      if (node) {
        this.tree().expand(node);
      }
      nodes = node?.children ?? [];
    }
  }
}
