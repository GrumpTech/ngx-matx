import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matxOverflowTooltip]',
})
export class MatxOverflowTooltip
  extends MatTooltip
  implements OnInit, OnDestroy
{
  public readonly matxOverflowTooltip = input('');
  private element = inject(ElementRef);
  private resizeObserver = new ResizeObserver(() => this.setTooltipState());

  ngOnInit(): void {
    this.message = this.matxOverflowTooltip();
    this.resizeObserver.observe(this.element.nativeElement);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeObserver.disconnect();
  }

  private setTooltipState() {
    const element = this.element.nativeElement as HTMLElement;
    const disabled = element.scrollWidth <= element.offsetWidth;
    if (this.disabled !== disabled) {
      disabled ? super.hide() : super.show();
      this.disabled = disabled;
    }
  }
}
