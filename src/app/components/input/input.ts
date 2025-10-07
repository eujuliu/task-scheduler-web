import { Component, computed, Input, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { Button } from '../button/button';

export type InputType = 'text' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
  imports: [IonIcon, Button],
})
export class InputComponent {
  @Input({ required: false }) type: InputType = 'text';
  @Input({ required: false }) label = '';
  @Input({ required: false, transform: (val: string) => val.trim() }) placeholder = '';
  @Input({ required: false }) icon = '';

  showPassword = signal(false);

  formattedLabel = computed(() => this.label.toLowerCase().trim().replaceAll(' ', '-'));
  inputType = computed(() =>
    this.type !== 'password' ? this.type : this.showPassword() ? 'text' : 'password',
  );

  constructor() {
    addIcons(allIcons);
  }

  changeInputVisibility() {
    this.showPassword.update((v) => !v);
  }
}
