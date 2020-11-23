import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignupRequestPayload } from '../signup/singup.request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponsePayload } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  refreshToken() {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh-token', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear("authenticationToken");
        this.localStorage.clear("expiresAt");

        this.localStorage.store("authenticationToken", response.authenticationToken);
        this.localStorage.store("expiresAt", response.expiresAt);
      }));
  }

  getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
    }))
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() !== null;
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload)
    .subscribe((data) => {
      console.log(data);
    }, (error) => {
      throwError(error);
    })

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
