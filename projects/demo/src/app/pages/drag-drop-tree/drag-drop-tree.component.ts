import { ChangeDetectionStrategy, Component } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  DragDropNode,
  DroppedEvent,
  MatxDragDropTree,
} from '@grumptech/ngx-matx/drag-drop-tree';

@Component({
  selector: 'drag-drop-tree',
  templateUrl: './drag-drop-tree.component.html',
  styleUrl: './drag-drop-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxDragDropTree],
})
export class DragDropTreePage {
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
  nodes2: DragDropNode<string>[] = [
    {
      data: 'item1',
      childNodes: [
        { data: 'item2' },
        { data: 'item3', childNodes: [{ data: 'item4', childNodes: [] }] },
        { data: 'item5', childNodes: [{ data: 'item6' }] },
      ],
    },
  ];

  handleDropped(event: DroppedEvent) {
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
  handleDropped2(event: DroppedEvent<string>) {
    this.handleDropped(event as any as DroppedEvent);
  }
  handleClick(title: string) {
    console.log('clicked:', title);
  }
}
