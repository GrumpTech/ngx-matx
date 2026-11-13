import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxPanel } from './panel.component';

describe('MatxPanel', () => {
  let fixture: ComponentFixture<MatxPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxPanel);
    fixture.componentRef.setInput('headerTitle', 'Panel');
    fixture.componentRef.setInput('fullHeight', true);
    fixture.detectChanges();
  });

  it('renders the title and full-height layout state', () => {
    const title = fixture.nativeElement.querySelector('.title');
    const card = fixture.nativeElement.querySelector('mat-card');
    const content = fixture.nativeElement.querySelector('mat-card-content');

    expect(fixture.componentInstance).toBeTruthy();
    expect(title.textContent.trim()).toBe('Panel');
    expect(card.classList.contains('full-height')).toBeTrue();
    expect(content.classList.contains('full-height')).toBeTrue();
  });
});
