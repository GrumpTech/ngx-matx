import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxFullWidthFormFields } from './full-width-form-fields.component';

describe('MatxFullWidthFormFields', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    @Component({
      template: `
        <matx-full-width-form-fields>
          <input value="example" />
        </matx-full-width-form-fields>
      `,
      imports: [MatxFullWidthFormFields],
    })
    class HostComponent {}

    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders projected form content without altering the input value', () => {
    const input = fixture.nativeElement.querySelector('input');

    expect(input).toBeTruthy();
    expect(input.value).toBe('example');
  });
});
