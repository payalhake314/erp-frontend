import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Status } from '../../types/auth.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (this.authService.authStatus() === Status.LOGGEDOUT) {
        this.router.navigate(['/login']);
      }
    });
  }
}
