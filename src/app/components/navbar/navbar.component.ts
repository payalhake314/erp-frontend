import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavRoute } from '../../types/nav.types';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {
    effect(() => {
      this.isAuthenticated = this.authService.authStatus();
    });
  }
  ngOnInit(): void {}
  isAuthenticated: boolean = false;
  routes: NavRoute[] = [
    {
      name: 'profile',
      icon: 'person',
      url: '/profile',
      isGuarded: true,
    },
    { name: 'login', icon: 'passkey', url: '/login', isGuarded: false },
  ];

  onLogout() {
    this.authService.logout();
  }
}
