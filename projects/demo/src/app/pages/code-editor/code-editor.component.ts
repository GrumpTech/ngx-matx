import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeEditor } from '@grumptech/ngx-matx/code-editor';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeEditor],
})
export class CodeEditorPage {
  protected readonly formatter = (data: string) => {
    try {
      const result = JSON.parse(data);
      return JSON.stringify(result, null, 2);
    } catch (error) {}
    return data;
  };
  protected readonly validator = (data: string) => this.validate(data);

  validate(data: string): any {
    try {
      return {
        success: true,
        message: '',
        result: JSON.parse(data ?? ''),
      };
    } catch (error) {
      return {
        success: false,
        message: `Invalid json - ${(error as any).message}`,
        result: {},
      };
    }
  }
}
