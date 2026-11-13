import { ChangeDetectionStrategy, Component } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  DragDropNode,
  DroppedEvent,
  MatxDragDropTree,
} from '@grumptech/ngx-matx/drag-drop-tree';

@Component({
  selector: 'app-drag-drop-tree-text-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxDragDropTree],
  template: `<matx-drag-drop-tree
    [nodes]="nodes"
    (dropped)="handleDropped($event)"
  />`,
})
export class DragDropTreeTextDemo {
  nodes: DragDropNode[] = [
    {
      text: 'item1',
      childNodes: [
        { text: 'item2', childNodes: [] },
        { text: 'item3', childNodes: [{ text: 'item4', childNodes: [] }] },
        { text: 'item5', childNodes: [{ text: 'item6', childNodes: [] }] },
      ],
    },
  ];

  handleDropped(event: DroppedEvent): void {
    if (event.targetArray === event.currentArray) {
      moveItemInArray(event.targetArray, event.currentIndex, event.targetIndex);
    } else {
      transferArrayItem(
        event.currentArray,
        event.targetArray,
        event.currentIndex,
        event.targetIndex,
      );
    }
  }
}
