import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { PopOver } from '../popover/popover';
import { Button } from '../button/button';
import { ResizeDirective } from '../../shared/directives/resize.directive';
import { ControlValueAccessor } from '@angular/forms';
import { VisibilityDirective } from '../../shared/directives/visible.directive';

export interface SelectOption {
  id: string;
  icon?: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [PopOver, Button, ResizeDirective, VisibilityDirective],
  templateUrl: './select.html',
  styleUrl: './select.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[style.--select-content-width]': 'contentWidth()',
    '[style.--select-trigger-width]': 'maxTriggerWidth',
  },
})
export class Select implements ControlValueAccessor, AfterViewInit {
  @Input({ required: true }) options!: SelectOption[];
  @Input({ required: false }) defaultValue = '';
  @Input({ required: false }) maxTriggerWidth?: string;

  @Output() changed = new EventEmitter<string>();

  @ViewChild('popover') popover: PopOver | undefined;

  contentWidth = signal('fit-content');
  showTopArrow = signal(false);
  showBottomArrow = signal(false);

  protected value = this.defaultValue;
  protected disabled = false;

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

  setValue(option: SelectOption) {
    if (!this.disabled) {
      this.writeValue(option.value);

      if (this.onChanged) this.onChanged(option.value);
      if (this.onTouched) this.onTouched();

      if (this.popover) this.popover.close();

      this.changed.emit(option.value);
    }
  }

  showingOption(index: number, visible: boolean) {
    this.showTopArrow.set(!(index === 0 && visible));
    this.showBottomArrow.set(!(index === this.options.length - 1 && visible));
  }
}
