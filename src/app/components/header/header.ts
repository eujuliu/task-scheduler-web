import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavigationItem {
  id: string;
  to: string;
  text: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Header {
  @Input({ required: true }) navigation: NavigationItem[] = [];
}
