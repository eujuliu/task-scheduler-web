import { Component, Input } from '@angular/core';

export type ButtonType = 'button' | 'submit';
export type ButtonStyle = 'normal' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  imports: [],
})
export class Button {
  @Input({ required: false }) type: ButtonType = 'button';
  @Input({ required: false }) style: ButtonStyle = 'normal';
  @Input({ required: false }) size: ButtonSize = 'md';
  @Input({ required: false }) disabled = false;
  @Input({ required: false }) full = false;
  @Input({ required: false }) popovertarget = '';
}
