import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxFileTree } from './file-tree.component';

describe('MatxFileTree', () => {
  let fixture: ComponentFixture<MatxFileTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxFileTree],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxFileTree);
    fixture.componentRef.setInput('filenames', ['app.ts']);
    fixture.detectChanges();
  });

  it('builds a visible tree from file paths and emits clicked files', () => {
    const clickSpy = jasmine.createSpy('fileClick');
    fixture.componentInstance.fileClick.subscribe(clickSpy);

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('app.ts');

    const firstNode = fixture.nativeElement.querySelector('mat-tree-node');
    firstNode?.click();

    expect(clickSpy).toHaveBeenCalledWith('app.ts');
  });
});
