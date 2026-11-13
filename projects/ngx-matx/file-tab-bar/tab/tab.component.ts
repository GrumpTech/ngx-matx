import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ModificationState } from '../models';

@Component({
  selector: 'matx-file-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon],
})
export class MatxFileTab {
  readonly text = input.required<string>();
  readonly selected = model.required<boolean>();
  readonly modificationState = input<ModificationState>(
    ModificationState.Unmodified,
  );
  readonly tabSelect = output();
  readonly tabClose = output();

  protected readonly hovering = signal(false);
  protected readonly buttonTag = computed(() =>
    this.hovering()
      ? 'close-button'
      : this.buttonTags.get(this.modificationState()),
  );

  private buttonTags = new Map([
    [ModificationState.New, 'add'],
    [ModificationState.Unknown, 'circle'],
    [ModificationState.Modified, 'circle'],
    [ModificationState.Unmodified, ''],
  ]);

  constructor() {
    const elementRef = inject(ElementRef);
    toObservable(this.selected).subscribe(
      (selected) =>
        selected &&
        elementRef.nativeElement.scrollIntoView &&
        elementRef.nativeElement.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        }),
    );
  }

  protected handleClick(event: MouseEvent): void {
    if ((event.target as any)?.tagName.toLowerCase() !== 'mat-icon') {
      this.selected.set(true);
      this.tabSelect.emit();
    }
  }

  protected handleClose(): void {
    this.tabClose.emit();
  }

  protected handleMouseEnter(): void {
    this.hovering.set(true);
  }

  protected handleMouseLeave(): void {
    this.hovering.set(false);
  }
}
