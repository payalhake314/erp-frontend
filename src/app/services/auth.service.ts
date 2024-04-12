import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { IAuthInfo, IUserCred } from '../types/user.type';
import { Status } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  authStatus: WritableSignal<Status> = signal<Status>(Status.LOGGEDOUT);

  login(data: IUserCred) {
    if (data.username === 'lorem_ipsum' && data.password === 'Lorem@123') {
      const exp = new Date();
      exp.setMinutes(exp.getMinutes() + 10);
      localStorage.setItem(
        'AUTH_INFO',
        JSON.stringify({ username: data.username, expires: exp.toISOString() })
      );
    }
    this.authStatus.set(Status.LOGGEDIN);
  }

  checkAuthStatus(): boolean {
    const authData = localStorage.getItem('AUTH_INFO');
    const status =
      authData !== null &&
      new Date((<IAuthInfo>JSON.parse(authData)).expires) > new Date();
    this.authStatus.update(() => (status ? Status.LOGGEDIN : Status.LOGGEDOUT));
    return status;
  }

  logout() {
    localStorage.removeItem('AUTH_INFO');
    this.authStatus.set(Status.LOGGEDOUT);
  }
}
