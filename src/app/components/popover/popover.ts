import { AfterViewInit, Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { Button, ButtonStyle } from '../button/button';
import { randomString } from '../../shared/services/helpers.service';

@Component({
  selector: 'app-popover',
  imports: [Button],
  templateUrl: './popover.html',
  styleUrl: './popover.css',
  host: {
    '[style.--popover-anchor]': 'anchor',
    '[style.--anchor-top-position]': 'offsetY',
    '[style.--anchor-left-position]': 'offsetX',
  },
})
export class PopOver implements AfterViewInit {
  @Input({ required: false }) anchor = '--anchor';
  @Input({ required: false }) offsetY: 'top' | 'center' | 'bottom' = 'top';
  @Input({ required: false }) offsetX: 'left' | 'center' | 'right' = 'left';

  @Input({ required: false }) buttonStyle: ButtonStyle = 'normal';

  @ViewChild('popover') popover: ElementRef | undefined;

  id = signal(`popover-${randomString(8)}`);

  ngAfterViewInit(): void {
    if (this.popover) {
      const elem = this.popover.nativeElement as HTMLOptGroupElement;
      this.close = () => elem.hidePopover();
    }
  }

  public close!: () => void;
}
