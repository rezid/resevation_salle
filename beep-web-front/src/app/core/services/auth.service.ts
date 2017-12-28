import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { Profile } from '../models/profile/profile';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { LoginResponse } from '../models/login-response/login-response';

@Injectable()
export class AuthService {


  constructor(
    private http: HttpService,
  ) {

  }



  register(profile: Profile, password: string): Observable<LoginResponse> {

    const profileWithPassword = Object.assign({}, profile, { password: password });
    console.log(profileWithPassword);


    return this.http.post('signup', profileWithPassword)
      .map((response: any) => {
        const loginResponse: LoginResponse = response.json();
        console.log(loginResponse);

        if (!loginResponse.error) {
          // Setting token after login
          this.setTokenInLocalStorage(loginResponse.success.uid);

        } else {
          this.http.loading.next({
            loading: false,
            hasError: true,
            hasMsg: 'Please enter valid Credentials'
          });
        }
        return loginResponse;
      });
  }


  login(email: string, password: string): Observable<LoginResponse> {

    const emailWithPassword = Object.assign({}, {email: email}, { password: password });
    console.log(emailWithPassword);


    return this.http.post('login', emailWithPassword)
      .map((response: any) => {
        const loginResponse: LoginResponse = response.json();
        console.log(loginResponse);

        if (!loginResponse.error) {
          // Setting token after login
          this.setTokenInLocalStorage(loginResponse.success.uid);

        } else {
          this.http.loading.next({
            loading: false,
            hasError: true,
            hasMsg: 'Please enter valid Credentials'
          });
        }
        return loginResponse;
      });
  }


  authorized(): Observable<any> {
    return this.http.post('authenticate', {})
      .map((res: Response) => {
        console.log(res.json());
        return res.json();
      });
  }

  logout() {
    localStorage.removeItem('uid');
  }




  private setTokenInLocalStorage(uid: string): void {
    localStorage.setItem('uid', uid);
  }
}
