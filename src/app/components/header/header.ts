import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

export interface NavigationItem {
  id: string;
  to: string;
  text: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  imports: [IonIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input({ required: true }) navigation: NavigationItem[] = [];

  constructor() {
    addIcons(allIcons);
  }
}
