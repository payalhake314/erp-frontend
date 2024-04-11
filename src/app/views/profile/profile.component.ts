import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  
  constructor(private authService: AuthService, private router: Router ){
    effect(()=>{
      if(!this.authService.authStatus()){
        this.router.navigate(['/login'])
      }
    })
  }

  personalDetails = new FormGroup({
    name: new FormControl({ value: 'Lorem Ipsum', disabled: true }, [
      Validators.required,
      Validators.pattern(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/),
    ]),
    email: new FormControl({ value: 'lorem@ipsum.com', disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/
      ),
    ]),
    address: new FormControl(
      {
        value:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem rerum iure ex iste sunt minima, mollitia eveniet corrupti beatae consequatur a nemo modi nobis eligendi expedita alias labore quibusdam eum.',
        disabled: true,
      },
      [Validators.required, Validators.pattern(/^[\w\s ,.]+$/)]
    ),
    contact: new FormControl({ value: '1234567890', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    dob: new FormControl({ value: '1995-10-20', disabled: true }, [
      Validators.required,
    ]),
    doj: new FormControl({ value: '2016-04-19', disabled: true }, [
      Validators.required,
    ]),
  });
  accountDetails = new FormGroup({
    userid: new FormControl(
      { value: 'd2dd3d91-2434-467d-84f8-c9f309bf57ba', disabled: true },
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]
    ),
    username: new FormControl({ value: 'loremipsum', disabled: true }, [
      Validators.required,
      Validators.pattern(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
    ]),
    status: new FormControl({ value: 'ACTIVE', disabled: true }),
    role: new FormControl({ value: 'TEACHER', disabled: true }),
  });

  toggleStatePersonal() {
    Object.keys(this.personalDetails.controls)
      .filter((ky) => ky !== 'doj')
      .forEach((ky) => {
        const ctrl = this.personalDetails.get(ky);
        if (ctrl !== null) {
          ctrl.disabled ? ctrl.enable() : ctrl.disable();
        }
      });
  }

  toggleStateAccount() {
    const filtGrp: string[] = ['userid', 'status'];
    Object.keys(this.accountDetails.controls)
      .filter((ky) => !filtGrp.includes(ky))
      .forEach((ky) => {
        const ctrl = this.accountDetails.get(ky);
        if (ctrl !== null) {
          ctrl.disabled ? ctrl.enable() : ctrl.disable();
        }
      });
  }
}

