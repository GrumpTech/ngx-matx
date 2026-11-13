import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationState } from '../models';
import { TabsManager } from '../tabs-manager/tabs-manager';
import { MatxFileTabBar } from './tab-bar.component';

describe('MatxFileTabBar', () => {
  let fixture: ComponentFixture<MatxFileTabBar<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxFileTabBar],
      providers: [TabsManager],
    }).compileComponents();

    const manager = TestBed.inject(TabsManager<any>);
    manager.openNewTab({
      filename: 'example.ts',
      modificationState: ModificationState.Unmodified,
    });

    fixture = TestBed.createComponent(MatxFileTabBar<any>);
    fixture.detectChanges();
  });

  it('renders the tab list and emits the selected filename', () => {
    const tabSelectSpy = jasmine.createSpy('tabSelect');
    fixture.componentInstance.tabSelect.subscribe(tabSelectSpy);

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.tabs().length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('example.ts');

    const button = fixture.nativeElement.querySelector('matx-file-tab button');
    button.click();

    expect(tabSelectSpy).toHaveBeenCalledWith('example.ts');
  });
});
