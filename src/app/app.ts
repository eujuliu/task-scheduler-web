import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, NavigationItem } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  links: NavigationItem[] = [
    {
      id: 'tasks',
      text: 'task',
      to: '/tasks',
    },
    {
      id: 'emails',
      text: 'email',
      to: '/emails',
    },
  ];
}
