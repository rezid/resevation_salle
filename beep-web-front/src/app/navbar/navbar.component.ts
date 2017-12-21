import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { LoginResponse } from '../models/login-response/login-response';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
