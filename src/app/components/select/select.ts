import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Button, ButtonStyle } from '../button/button';
import { ResizeDirective } from '../../shared/directives/resize.directive';
import { ControlValueAccessor } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { SelectContent } from './select-content/select-content';
import { randomString } from '../../shared/services/helpers.service';

@Component({
  selector: 'app-select',
  imports: [Button, ResizeDirective, OverlayModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[style.--slc-trigger-width]': 'width',
  },
})
export class Select implements ControlValueAccessor, AfterViewInit, AfterContentInit {
  @ContentChild(SelectContent) content?: SelectContent;

  @Input({ required: false }) defaultValue = '';
  @Input({ required: false }) width?: string;
  @Input({ required: false }) buttonStyle: ButtonStyle = 'outline';
  @Input({ required: false })
  set model(val: string) {
    this._selected.set(val);
    this.updateItemsSelectedValue(val);
  }

  get model() {
    return this._selected();
  }

  @Output() changed = new EventEmitter<string>();

  contentWidth = signal('fit-content');
  opened = signal(false);

  private _selected = signal('');

  protected value = '';
  protected disabled = false;
  protected id = `slc-${randomString(8)}`;

  ngAfterContentInit() {
    this.content?.change.subscribe(({ value }) => {
      if (!this.disabled) {
        this.writeValue(value);

        if (this.onChanged) this.onChanged(value);
        if (this.onTouched) this.onTouched();

        this.changed.emit(value);
        this.opened.set(false);
      }
    });
  }

  onChanged?: (value: unknown) => void;
  onTouched?: () => void;

  ngAfterViewInit(): void {
    this.writeValue(this.defaultValue);
  }

  updateTriggerWidth(width: number) {
    this.contentWidth.update(() => `${width + 16}px`);
  }

  writeValue(value: string) {
    this.value = value;
    this.updateItemsSelectedValue(value);
  }

  registerOnChange(fn: (value: unknown) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  open(v: boolean) {
    this.opened.set(v);
  }

  updateItemsSelectedValue(val: string) {
    this.content?.items.forEach((item) => {
      item.selected = val;
    });
  }
}
