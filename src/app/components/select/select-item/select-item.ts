import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  signal,
} from '@angular/core';
import { Button } from '../../button/button';
import { VisibilityDirective } from '../../../shared/directives/visible.directive';
import { randomString } from '../../../shared/services/helpers.service';
import { SelectService } from '../../../shared/services/select.service';
import { Subscription } from 'rxjs';

export interface SelectOption {
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
  host: {
    '[attr.data-id]': 'id()',
  },
})
export class SelectItem implements AfterViewInit, OnDestroy {
  @Input({ required: false }) label!: string;
  @Input({ required: false }) value = '';
  @Input({ required: false }) icon?: string;

  readonly evident = new EventEmitter<boolean>();

  id = signal(`slc-${randomString(8)}`);
  checkVisibility = signal(false);
  selected = signal(false);

  sub!: Subscription;
  svc = inject(SelectService);

  ngAfterViewInit(): void {
    this.sub = this.svc.get(this.id()).subscribe((value) => {
      this.selected.set(value === this.value);
    });
  }

  setId(id: string) {
    this.ngOnDestroy();

    this.id.set(id);

    this.ngAfterViewInit();
  }

  select() {
    this.svc.set(this.id(), this.value);
  }

  visible(is: boolean) {
    this.evident.emit(is);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.svc.destroy(this.id());
  }
}
