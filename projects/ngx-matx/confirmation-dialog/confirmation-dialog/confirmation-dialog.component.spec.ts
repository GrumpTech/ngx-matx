import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatxConfirmationDialog } from './confirmation-dialog.component';

describe('MatxConfirmationDialog', () => {
  let fixture: ComponentFixture<MatxConfirmationDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<MatxConfirmationDialog, boolean>>;

  const dialogData = {
    title: 'Delete item',
    message: 'Are you sure you want to continue?',
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj<
      MatDialogRef<MatxConfirmationDialog, boolean>
    >('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatxConfirmationDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatxConfirmationDialog);
    fixture.detectChanges();
  });

  it('renders the dialog title and message from the provided data', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;

    expect(
      nativeElement.querySelector('[mat-dialog-title]')?.textContent,
    ).toContain(dialogData.title);
    expect(nativeElement.textContent).toContain(dialogData.message);
  });

  it('closes the dialog without a result when cancel is clicked', () => {
    fixture.componentInstance.cancel();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('closes the dialog with true when continue is clicked', () => {
    const continueButton = fixture.nativeElement.querySelectorAll('button')[0];

    continueButton.click();

    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
