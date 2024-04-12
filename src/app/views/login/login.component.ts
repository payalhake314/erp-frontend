import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Status } from '../../types/auth.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (this.authService.authStatus() === Status.LOGGEDIN) {
        this.router.navigate(['/profile']);
      }
    });
  }

  user: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });
  ngOnInit(): void {
    this.user.controls['username'].valueChanges.subscribe((value) => {
      if (value === '') {
        this.user.controls['username'].setErrors({ required: true });
      }
    });
    this.user.controls['password'].valueChanges.subscribe((value) => {
      if (value === '') {
        this.user.controls['password'].setErrors({ required: true });
      }
    });
  }
  onSubmit(evt: Event) {
    evt.preventDefault();
    this.authService.login(this.user.value);
  }
}
