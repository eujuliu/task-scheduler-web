import {
  AfterViewInit,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { Button, ButtonStyle } from '../button/button';
import { ResizeDirective } from '../../shared/directives/resize.directive';
import { ControlValueAccessor } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { SelectContent } from './select-content/select-content';
import { randomString } from '../../shared/services/helpers.service';
import { Subscription } from 'rxjs';
import { SelectService } from '../../shared/services/select.service';

@Component({
  selector: 'app-select',
  imports: [Button, ResizeDirective, OverlayModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[style.--slc-trigger-width]': 'width',
    '[attr.data-id]': 'id()',
  },
})
export class Select implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @ContentChild(SelectContent) content?: SelectContent;

  @Input({ required: false }) defaultValue?: string;
  @Input({ required: false }) width?: string;
  @Input({ required: false }) buttonStyle: ButtonStyle = 'outline';
  @Input({ required: false })
  set group(value: string) {
    this.id.set(value);
  }

  @Output() changed = new EventEmitter<string>();

  contentWidth = signal('fit-content');
  opened = signal(false);

  value = signal('');
  disabled = signal(false);

  id = signal(`slc-${randomString(8)}`);

  sub!: Subscription;
  svc = inject(SelectService);

  onChanged?: (value: unknown) => void;
  onTouched?: () => void;

  ngAfterViewInit(): void {
    this.sub = this.svc.get(this.id()).subscribe((value) => {
      if (!this.disabled()) {
        this.writeValue(value as string);

        if (this.onChanged) this.onChanged(value);
        if (this.onTouched) this.onTouched();

        this.changed.emit(value as string);
        this.opened.set(false);
      }
    });

    this.content?.setId(this.id());
    if (this.defaultValue) this.svc.set(this.id(), this.defaultValue);
  }

  updateTriggerWidth(width: number) {
    this.contentWidth.update(() => `${width + 16}px`);
  }

  writeValue(value: string) {
    this.value.set(value);
  }

  registerOnChange(fn: (value: unknown) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  open(v: boolean) {
    this.opened.set(v);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.svc.destroy(this.id());
  }
}
