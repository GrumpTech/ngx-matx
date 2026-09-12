import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  TrackByFunction,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropNode } from '../models';

@Component({
  selector: 'matx-drag-drop-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, DragDropModule],
})
export class MatxDragDropTreeNode<T = undefined> {
  readonly siblings = input<DragDropNode<T>[]>([]);
  readonly parent = input<DragDropNode<T>>();
  readonly index = input.required<number>();
  readonly headerTemplate = input<TemplateRef<any>>();
  readonly trackBy = input<TrackByFunction<DragDropNode<T>>>((i) => i);
  readonly dropped = output<CdkDragDrop<any>>();

  protected dragging = signal(false);

  private changeDetectorRef = inject(ChangeDetectorRef);

  protected handleDropped(event: CdkDragDrop<any>) {
    if (event.isPointerOverContainer) {
      this.dropped.emit(event);
    }
  }

  protected handleDragStarted() {
    this.dragging.set(true);
    this.changeDetectorRef.detectChanges();
  }

  protected handleDragEnded() {
    this.dragging.set(false);
  }
}
