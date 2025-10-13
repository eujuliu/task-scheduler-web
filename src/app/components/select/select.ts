import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Button } from '../button/button';
import { ResizeDirective } from '../../shared/directives/resize.directive';
import { ControlValueAccessor } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { SelectContent } from './select-content/select-content';
import { CommunicationService } from '../../shared/services/communication.service';

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

  @Output() changed = new EventEmitter<string>();

  communicationService = inject(CommunicationService);
  contentWidth = signal('fit-content');

  protected opened = false;
  protected value = '';
  protected disabled = false;

  ngAfterContentInit() {
    this.content?.change.subscribe(({ value }) => {
      if (!this.disabled) {
        this.writeValue(value);

        if (this.onChanged) this.onChanged(value);
        if (this.onTouched) this.onTouched();

        this.changed.emit(value);
        this.opened = false;
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
    this.communicationService.sendUpdate(value);
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
}
