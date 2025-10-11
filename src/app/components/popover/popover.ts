import { Component, Input, signal } from '@angular/core';
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
export class PopOver {
  @Input({ required: false }) anchor = '--anchor';
  @Input({ required: false }) offsetY: 'top' | 'center' | 'bottom' = 'top';
  @Input({ required: false }) offsetX: 'left' | 'center' | 'right' = 'left';

  @Input({ required: false }) buttonStyle: ButtonStyle = 'normal';

  id = signal(`popover-${randomString(8)}`);
}
