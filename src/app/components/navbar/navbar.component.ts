import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  routes = [
    {
      name: 'students',
      icon: 'person_raised_hand',
      route: '/students'
    },
    {
      name: 'faculty',
      icon: 'cognition',
      route: '/faculties'
    }
  ]
}
