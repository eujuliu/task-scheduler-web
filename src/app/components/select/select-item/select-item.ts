import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, signal } from '@angular/core';
import { Button } from '../../button/button';
import { VisibilityDirective } from '../../../shared/directives/visible.directive';

export interface SelectOption {
  key: string;
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-select-item',
  imports: [Button, VisibilityDirective],
  templateUrl: './select-item.html',
  styleUrl: './select-item.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectItem {
  @Input({ required: false }) label!: string;
  @Input({ required: false }) value = '';
  @Input({ required: false }) selected = '';
  @Input({ required: false }) icon?: string;
  @Input({ required: true }) key!: string;

  readonly change = new EventEmitter<void>();
  readonly evident = new EventEmitter<boolean>();

  checkVisibility = signal(false);

  select() {
    this.change.emit();
  }

  visible(is: boolean) {
    this.evident.emit(is);
  }
}
