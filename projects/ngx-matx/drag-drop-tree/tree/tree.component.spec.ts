import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxDragDropTree } from './tree.component';

describe('MatxDragDropTree', () => {
  let fixture: ComponentFixture<MatxDragDropTree<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxDragDropTree],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxDragDropTree<any>);
    fixture.componentRef.setInput('nodes', [
      { text: 'root', childNodes: [] },
      { text: 'second', childNodes: [] },
    ]);
    fixture.detectChanges();
  });

  it('renders the supplied tree items and emits dropped events', () => {
    const droppedSpy = jasmine.createSpy('dropped');
    fixture.componentInstance.dropped.subscribe(droppedSpy);

    const text = fixture.nativeElement.textContent;
    expect(fixture.componentInstance).toBeTruthy();
    expect(text).toContain('root');
    expect(text).toContain('second');

    const nodes = fixture.componentInstance['nodes']();
    const targetNodes = [{ text: 'target', childNodes: [] }];
    fixture.componentInstance.handleDropped({
      item: { data: { parent: undefined, array: nodes, index: 0 } },
      container: { data: { parent: undefined, array: targetNodes, index: 0 } },
    } as any);

    expect(droppedSpy).toHaveBeenCalledTimes(1);
  });
});
