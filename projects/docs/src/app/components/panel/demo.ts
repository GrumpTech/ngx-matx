import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatxPanel, MatxPanelHeaderButton } from '@grumptech/ngx-matx/panel';

@Component({
  selector: 'app-panel-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatxPanel, MatxPanelHeaderButton],
  template: `
    <matx-panel headerTitle="Project files">
      <matx-panel-header-button
        icon="refresh"
        tooltip="Refresh"
        (click)="refresh()"
      />
      <p>{{ message }}</p>
    </matx-panel>
  `,
})
export class PanelDemo {
  protected message = 'Panel content appears here.';

  protected refresh(): void {
    this.message = 'Panel refreshed.';
  }
}
