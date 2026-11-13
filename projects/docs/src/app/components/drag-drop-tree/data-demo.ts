import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  DragDropNode,
  DroppedEvent,
  MatxDragDropTree,
} from '@grumptech/ngx-matx/drag-drop-tree';

@Component({
  selector: 'app-drag-drop-tree-data-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxDragDropTree],
  template: `
    <matx-drag-drop-tree [nodes]="nodes" (dropped)="handleDropped($event)">
      <ng-template #headerTemplate let-item="item">
        <span (click)="handleClick(item.text)">
          @if (item.childNodes) {
            {{ item.text }}
          } @else {
            <em>{{ item.text }}</em>
          }
        </span>
      </ng-template>
    </matx-drag-drop-tree>
    <p>Clicked: {{ result() }}</p>
  `,
})
export class DragDropTreeDataDemo {
  result = signal('none yet');
  nodes: DragDropNode[] = [
    {
      text: 'item1',
      childNodes: [
        { text: 'item2' },
        { text: 'item3', childNodes: [{ text: 'item4', childNodes: [] }] },
        { text: 'item5', childNodes: [{ text: 'item6' }] },
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

  handleClick(title: string): void {
    this.result.set(title);
  }
}
