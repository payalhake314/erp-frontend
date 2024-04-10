import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
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
  onSubmit(evt: Event){
    evt.preventDefault();
    // Handle data via account service
  }
}
