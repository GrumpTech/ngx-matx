import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxMenu } from './menu.component';

describe('MatxMenu', () => {
  let fixture: ComponentFixture<MatxMenu<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxMenu<any>);
    fixture.componentRef.setInput('items', [
      {
        text: 'Open',
        shortcuts: [{ keyCode: 'KeyO' }, { keyCode: 'KeyS', ctrl: true }],
      },
    ]);
    fixture.detectChanges();
  });

  it('formats shortcut text exactly the way the component exposes it', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(
      fixture.componentInstance.getShortcutText([{ keyCode: 'KeyO' }]),
    ).toBe(' -	O');
    expect(
      fixture.componentInstance.getShortcutText([
        { keyCode: 'KeyS', ctrl: true },
        { keyCode: 'KeyO', alt: true },
      ]),
    ).toBe(' -	Ctrl + S,  -	Alt + O');
  });
});
