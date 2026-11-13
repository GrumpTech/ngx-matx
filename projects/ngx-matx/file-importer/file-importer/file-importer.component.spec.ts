import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxFileImporter } from './file-importer.component';

describe('MatxFileImporter', () => {
  let fixture: ComponentFixture<MatxFileImporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxFileImporter],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxFileImporter);
    fixture.detectChanges();
  });

  it('sets the correct file input contract before a user selects files', () => {
    const component = fixture.componentInstance;

    component.import(true, ['txt']);

    const input = fixture.nativeElement.querySelector('input');
    expect(input.multiple).toBeTrue();
    expect(input.accept).toBe('.txt');
    expect(input.value).toBe('');
  });
});
