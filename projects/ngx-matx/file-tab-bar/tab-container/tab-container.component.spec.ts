import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxFileTabContainer } from './tab-container.component';

describe('MatxFileTabContainer', () => {
  let fixture: ComponentFixture<MatxFileTabContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxFileTabContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxFileTabContainer);
    fixture.detectChanges();
  });

  it('renders projected tab content inside its container', () => {
    const host = document.createElement('matx-file-tab-container');
    host.innerHTML = '<button>Projected tab</button>';
    fixture.nativeElement.appendChild(host);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Projected tab');
  });
});
