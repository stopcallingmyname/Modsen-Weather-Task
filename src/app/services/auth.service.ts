import { Injectable } from '@angular/core';
import { OAuth2Client } from 'google-auth-library';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(this.loggedIn());
  private username = new BehaviorSubject<string>(
    localStorage.getItem('username')!
  );

  constructor() {}

  //   async getAuthenticatedClient(): Promise<OAuth2Client> {
  //     const client = new google.auth.OAuth2(
  //       environment.GOOGLE_CLIENT_ID,
  //       environment.GOOGLE_CLIENT_SECRET,
  //       environment.GOOGLE_REDIRECT_URI
  //     );

  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       client.setCredentials({ access_token: token });
  //     }

  //     return client;
  //   }

  public signOutExternal = () => {
    localStorage.removeItem('token');
    console.log('token deleted');
  };

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setLoginStatus(val: any) {
    this.loginStatus.next(val);
  }

  setUsername(val: any) {
    this.username.next(val);
  }
}
