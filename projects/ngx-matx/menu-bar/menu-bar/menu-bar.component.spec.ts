import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxMenuBar } from './menu-bar.component';

describe('MatxMenuBar', () => {
  let fixture: ComponentFixture<MatxMenuBar<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxMenuBar],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxMenuBar<any>);
    fixture.componentRef.setInput('menuBar', [
      {
        text: 'Item',
        children: [
          {
            text: 'Action',
            shortcuts: [{ keyCode: 'KeyA' }],
            children: [],
          },
        ],
      },
    ]);
    fixture.detectChanges();
  });

  it('renders the menu items and emits on keyboard shortcut trigger', () => {
    const itemClickSpy = jasmine.createSpy('itemClick');
    fixture.componentInstance.itemClick.subscribe(itemClickSpy);

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Item');

    fixture.componentInstance['handleKeyDown']({
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: 'KeyA',
      preventDefault: () => undefined,
      stopImmediatePropagation: () => undefined,
      target: document.body,
    } as any);

    expect(itemClickSpy).toHaveBeenCalledWith({
      text: 'Action',
      shortcuts: [{ keyCode: 'KeyA' }],
      children: [],
    });
  });
});
