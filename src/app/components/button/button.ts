import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

export type ButtonType = 'button' | 'submit';
export type ButtonStyle = 'normal' | 'ghost';

@Component({
  selector: 'app-button',
  imports: [IonIcon],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input({ required: false }) icon = '';
  @Input({ required: false }) text = '';
  @Input({ required: true }) type: ButtonType = 'button';
  @Input({ required: true }) style: ButtonStyle = 'normal';

  constructor() {
    addIcons(allIcons);
  }
}
