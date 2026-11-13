import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeEditor } from '@grumptech/ngx-matx/code-editor';

@Component({
  selector: 'app-code-editor-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeEditor],
  styles: [
    `
      matx-code-editor {
        width: 100%;
        max-width: 40rem;
        height: 14rem;
      }
    `,
  ],
  template: `
    <matx-code-editor
      [data]="json"
      [formatter]="formatJson"
      [validator]="validateJson"
      (validChange)="lastValidJson.set($event)"
    />
    <p>Last valid edit: {{ lastValidJson() }}</p>
  `,
})
export class CodeEditorDemo {
  protected readonly json = `{ "message" : "Edit this JSON to see validated updates." }`;
  protected lastValidJson = signal(this.json);

  protected formatJson(value: string): string {
    return JSON.stringify(JSON.parse(value), null, 2);
  }
  protected validateJson(value: string): { valid: boolean; message: string } {
    try {
      JSON.parse(value);
      return { valid: true, message: '' };
    } catch {
      return { valid: false, message: 'Enter valid JSON.' };
    }
  }
}
