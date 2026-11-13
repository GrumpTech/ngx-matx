import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxDragDropTreeNode } from './tree-node.component';

describe('MatxDragDropTreeNode', () => {
  let fixture: ComponentFixture<MatxDragDropTreeNode<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxDragDropTreeNode],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxDragDropTreeNode<any>);
    fixture.componentRef.setInput('siblings', [
      { text: 'root', childNodes: [] },
    ]);
    fixture.componentRef.setInput('index', 0);
    fixture.detectChanges();
  });

  it('renders the node text and emits drop events', () => {
    const droppedSpy = jasmine.createSpy('dropped');
    fixture.componentInstance.dropped.subscribe(droppedSpy);

    expect(fixture.nativeElement.textContent).toContain('root');

    fixture.componentInstance['handleDropped']({
      isPointerOverContainer: true,
    } as any);

    expect(droppedSpy).toHaveBeenCalledTimes(1);
  });
});
