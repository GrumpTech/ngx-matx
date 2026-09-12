import {
  AfterContentInit,
  Directive,
  ElementRef,
  input,
  contentChildren,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuTrigger } from '@angular/material/menu';

@Directive({
  selector: '[matxMenuTriggers]',
  host: {
    '(mouseover)': 'handleMouseOver($event)',
    '(window:mousedown)': 'handleMouseDown($event)',
  },
})
export class MatxMenuTriggers implements AfterContentInit {
  readonly menuClass = input('');

  private elementRef = inject(ElementRef);
  private readonly menuTriggers = contentChildren(MatMenuTrigger);
  private readonly menuTriggerElements = contentChildren(MatMenuTrigger, {
    read: ElementRef,
  });
  private openMenuTriggerIndex: number | null = null;
  private destroyRef = inject(DestroyRef);

  ngAfterContentInit(): void {
    if (!this.menuClass()) {
      throw new Error(
        "matxMenuTriggers: Set menuClass for detecting clicks on menu's.",
      );
    }
    this.menuTriggers().forEach((i) => {
      if (i.menu?.hasBackdrop) {
        throw new Error(
          "matxMenuTriggers: Set hasBackdrop to false for triggered menu's.",
        );
      }
      i.menuOpened
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.handleOpen(i));
      i.menuClosed
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.handleClose());
    });
  }

  protected handleMouseDown(event: MouseEvent): void {
    const element = event.target as Element;
    if (
      this.openMenuTriggerIndex !== null &&
      !element.closest(`.${this.menuClass()}`) &&
      (element?.closest('[matxMenuTriggers]') !==
        this.elementRef.nativeElement ||
        !element.closest('button'))
    ) {
      this.menuTriggers().at(this.openMenuTriggerIndex)?.closeMenu();
    }
  }

  protected handleMouseOver(event: MouseEvent) {
    if (this.openMenuTriggerIndex !== null && event.target) {
      const index = this.menuTriggerElements()
        .map((i) => i.nativeElement)
        .indexOf((event.target as Element).closest('button'));
      const menuTriggers = this.menuTriggers();
      if (index >= 0 && this.openMenuTriggerIndex !== index) {
        menuTriggers.at(this.openMenuTriggerIndex)?.closeMenu();
        menuTriggers.at(index)?.openMenu();
      }
    }
  }

  private handleOpen(trigger: MatMenuTrigger) {
    this.openMenuTriggerIndex = this.menuTriggers().indexOf(trigger);
  }

  private handleClose() {
    if (this.openMenuTriggerIndex !== null) {
      (
        this.menuTriggerElements().at(this.openMenuTriggerIndex)
          ?.nativeElement as HTMLElement
      ).blur();
    }
    this.openMenuTriggerIndex = null;
  }
}
