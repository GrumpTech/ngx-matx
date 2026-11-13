import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxFileTab } from './tab.component';

describe('MatxFileTab', () => {
  let fixture: ComponentFixture<MatxFileTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxFileTab],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxFileTab);
    fixture.componentRef.setInput('text', 'Example');
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();
  });

  it('renders the label and emits selection when clicked', () => {
    const tabSelectSpy = jasmine.createSpy('tabSelect');
    fixture.componentInstance.tabSelect.subscribe(tabSelectSpy);

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Example');
    expect(button.classList.contains('tab--selected')).toBeFalse();

    button.click();

    expect(tabSelectSpy).toHaveBeenCalledTimes(1);
  });
});
