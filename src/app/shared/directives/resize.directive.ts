import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  inject,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective implements OnDestroy {
  private observer!: ResizeObserver;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  @Output() resizeEl = new EventEmitter<DOMRectReadOnly>();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.resizeEl.emit(entry.contentRect);
        }
      });
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unobserve(this.el.nativeElement);
      this.observer.disconnect();
    }
  }
}
