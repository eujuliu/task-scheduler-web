import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Button } from '../../button/button';
import { VisibilityDirective } from '../../../shared/directives/visible.directive';
import { CommunicationService } from '../../../shared/services/communication.service';

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
export class SelectItem implements OnInit {
  @Input({ required: false }) label!: string;
  @Input({ required: false }) value = '';
  @Input({ required: false }) icon?: string;
  @Input({ required: true }) key!: string;

  readonly change = new EventEmitter<void>();
  readonly evident = new EventEmitter<boolean>();

  checkVisibility = signal(false);
  selected = signal('');
  communicationService = inject(CommunicationService);

  ngOnInit(): void {
    this.communicationService.data.subscribe((data) => this.selected.set(data as string));
  }

  select() {
    this.change.emit();
  }

  visible(is: boolean) {
    this.evident.emit(is);
  }
}
