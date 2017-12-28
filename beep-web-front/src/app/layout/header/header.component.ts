/*import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { LoginResponse } from '../../core/models/login-response/login-response';
import { AuthService } from '../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isRegistred = true;

  constructor(
    private auth: AuthService,
    private triggerChange: ChangeDetectorRef
  ) {
    this.auth.getAuthenticatedUser().subscribe(user =>
      user ? this.isRegistred = true : this.isRegistred = false);
  }

  ngOnInit() {


  }

  loginEventHandler(event: LoginResponse) {
    console.log(event);

    this.auth.getAuthenticatedUser().subscribe(user =>
      user ? this.isRegistred = true : this.isRegistred = false);

    this.triggerChange.detectChanges();


  }

  logoutEventHandler() {
    console.log('User Logout.');

    this.auth.getAuthenticatedUser().subscribe(user =>
      user ? this.isRegistred = true : this.isRegistred = false);

    this.triggerChange.detectChanges();

  }

}
*/

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
    /*this.auth.getAuthenticatedUser().subscribe(user =>
      user ? this.isAuthenticated = true : this.isAuthenticated = false);*/
  }
}
