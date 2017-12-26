import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { LoginResponse } from '../../../core/models/login-response/login-response';
import { Account } from '../../../core/models/account/account';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  signUpForm: FormGroup;
  formSubmit = false;
  title = 'Beep';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
  }

  async onSubmit() {
    const values = this.signUpForm.value;
    const account: Account = { email: values.email, password: values.password };
    const keys = Object.keys(values);
    this.formSubmit = true;

    console.log(account);
    console.log(this.signUpForm.valid);



    if (this.signUpForm.valid) {


      await this.authService
        .createUserWithEmailAndPassword(values)
        .then((loginResponse: LoginResponse) => {
          const error = loginResponse.error;
          if (error) {
            keys.forEach(val => {
              { this.pushErrorFor(val, loginResponse.error.message); }
            });
          }
        });
    } else {
      keys.forEach(val => {
        const ctrl = this.signUpForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        }
      });
    }
  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.signUpForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }

  initForm() {
    const email = '';
    const password = '';
    const password_confirmation = '';
    const phoneNumber = '';
    const firstName = '';
    const lastName = '';
    const dateOfBirth = '';



    this.signUpForm = this.fb.group({
      'email': [email,
        Validators.compose([Validators.required, Validators.email])],
      'password': [password,
        Validators.compose([Validators.required, Validators.minLength(6)])],
      'password_confirmation': [password_confirmation,
        Validators.compose([Validators.required, Validators.minLength(6)])],
      'phoneNumber': [phoneNumber,
        Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')])],
      'firstName': [firstName,
        Validators.compose([Validators.required])],
      'lastName': [lastName,
        Validators.compose([Validators.required])],
      'dateOfBirth': [dateOfBirth,
        Validators.compose([Validators.required, Validators.pattern('^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}')])],

    }, { validator: this.matchingPasswords('password', 'password_confirmation') }
    );
  }

  redirectIfUserLoggedIn() {
    this.authService.getAuthenticatedUser().subscribe(
      user => {
        if (user != null) { this.router.navigate(['../']); }
      }
    );
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }



}
