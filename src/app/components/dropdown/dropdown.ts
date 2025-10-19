import { Component, Input, signal } from '@angular/core';
import { Button, ButtonSize, ButtonStyle } from '../button/button';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dropdown',
  imports: [OverlayModule, Button],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input({ required: false }) buttonStyle: ButtonStyle = 'outline';
  @Input({ required: false }) buttonSize: ButtonSize = 'md';

  opened = signal(false);

  open(value: boolean) {
    this.opened.set(value);
  }
}
