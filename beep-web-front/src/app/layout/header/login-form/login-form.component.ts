import { Component, Output, OnInit, EventEmitter } from '@angular/core';

import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Account } from '../../../core/models/account/account';
import { LoginResponse } from '../../../core/models/login-response/login-response';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  account = {} as Account;

  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(
    private auth: AuthService
  ) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  ngOnInit() {
  }

  async login(account: Account) {
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(loginResponse);
  }

}
