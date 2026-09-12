import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'matx-panel-header-button',
  templateUrl: './panel-header-button.component.html',
  styleUrl: './panel-header-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatIconButton, MatTooltip],
})
export class MatxPanelHeaderButton {
  readonly icon = input.required<string>();
  readonly tooltip = input.required<string>();
  readonly selected = input(false);
  readonly disabled = input(false);
}
