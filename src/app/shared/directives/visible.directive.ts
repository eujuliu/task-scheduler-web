import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appVisibility]',
})
export class VisibilityDirective implements AfterViewInit, OnDestroy {
  @Input({ required: false }) monitorVisible = false;
  @Output() readonly visibleChange = new EventEmitter<boolean>();

  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    if (this.monitorVisible) {
      const container = this.el.nativeElement.parentElement;
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            this.visibleChange.emit(entry.intersectionRatio === 1);
          }
        },
        {
          root: container,
          threshold: 1.0,
        },
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.monitorVisible) {
      this.observer?.disconnect();
    }
  }
}
