import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxPanelHeaderButton } from './panel-header-button.component';

describe('MatxPanelHeaderButton', () => {
  let fixture: ComponentFixture<MatxPanelHeaderButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxPanelHeaderButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxPanelHeaderButton);
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('tooltip', 'Home');
    fixture.componentRef.setInput('selected', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
  });

  it('renders the configured icon and disabled selected state', () => {
    const button = fixture.nativeElement.querySelector('button');
    const icon = fixture.nativeElement.querySelector('mat-icon');

    expect(fixture.componentInstance).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.disabled).toBeTrue();
    expect(button.classList.contains('selected')).toBeTrue();
    expect(icon.textContent.trim()).toBe('home');
  });
});
