import {
  Component,
  TemplateRef,
  TrackByFunction,
  input,
  output,
  contentChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropNode, DroppedEvent } from '../models';
import { MatxDragDropTreeNode } from '../tree-node/tree-node.component';

@Component({
  selector: 'matx-drag-drop-tree',
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, MatxDragDropTreeNode],
})
export class MatxDragDropTree<T = undefined> {
  readonly nodes = input<DragDropNode<T>[]>([]);
  readonly trackBy = input<TrackByFunction<DragDropNode<T>>>(function (i, idx) {
    return i;
  });
  readonly dropped = output<DroppedEvent<T>>();
  readonly headerTemplate = contentChild<TemplateRef<any>>('headerTemplate');

  handleDropped(
    event: CdkDragDrop<
      { parent?: DragDropNode<T>; array: DragDropNode<T>[]; index: number },
      any,
      { parent?: DragDropNode<T>; array: DragDropNode<T>[]; index: number }
    >,
  ) {
    const currentArray = event.item.data.array;
    const currentIndex = event.item.data.index;
    const targetArray = event.container.data.array;
    let targetIndex = event.container.data.index;
    if (!this.includesRecursive(currentArray[currentIndex], targetArray)) {
      if (targetArray === currentArray) {
        targetIndex =
          currentIndex < targetIndex ? targetIndex - 1 : targetIndex;
        if (currentIndex === targetIndex) {
          return;
        }
      }
      this.dropped.emit({
        currentParent: event.item.data.parent,
        currentArray: currentArray,
        currentIndex: currentIndex,
        targetParent: event.container.data.parent,
        targetArray: targetArray,
        targetIndex: targetIndex,
      });
    }
  }

  private includesRecursive(
    item: DragDropNode<T>,
    nodes: DragDropNode<T>[],
  ): boolean {
    return (
      item.childNodes === nodes ||
      item.childNodes?.some((i) => this.includesRecursive(i, nodes)) ||
      false
    );
  }
}
