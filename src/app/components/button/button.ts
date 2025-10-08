import { Component, Input } from '@angular/core';

export type ButtonType = 'button' | 'submit';
export type ButtonStyle = 'normal' | 'ghost' | 'outline';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  imports: [],
})
export class Button {
  @Input({ required: true }) type: ButtonType = 'button';
  @Input({ required: true }) style: ButtonStyle = 'normal';
  @Input({ required: false }) disabled = false;
}
