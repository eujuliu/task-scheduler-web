import { Directive, ElementRef, OnDestroy, Output, EventEmitter, inject } from '@angular/core';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective implements OnDestroy {
  private observer: ResizeObserver;
  private el = inject(ElementRef);

  @Output() resizeEl = new EventEmitter<DOMRectReadOnly>();

  constructor() {
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.resizeEl.emit(entry.contentRect);
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
    this.observer.disconnect();
  }
}
