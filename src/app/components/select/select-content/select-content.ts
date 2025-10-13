import {
  AfterContentInit,
  Component,
  ContentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  OnDestroy,
  QueryList,
  signal,
} from '@angular/core';
import { SelectItem } from '../select-item/select-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-content',
  imports: [],
  templateUrl: './select-content.html',
  styleUrl: './select-content.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectContent implements AfterContentInit, OnDestroy {
  @ContentChildren(SelectItem) items!: QueryList<SelectItem>;

  showTopArrow = signal(false);
  showBottomArrow = signal(false);

  private subs: Subscription[] = [];
  readonly change = new EventEmitter<SelectItem>();

  ngAfterContentInit() {
    this.items.first.checkVisibility.set(true);
    this.items.last.checkVisibility.set(true);

    this.subs.push(this.items.first.evident.subscribe((value) => this.showTopArrow.set(!value)));
    this.subs.push(this.items.last.evident.subscribe((value) => this.showBottomArrow.set(!value)));

    this.items.forEach((item) => {
      this.subs.push(item.change.subscribe(() => this.change.emit(item)));
    });

    this.items.changes.subscribe(() => {
      this.cleanup();
      this.ngAfterContentInit();
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private cleanup() {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }
}
