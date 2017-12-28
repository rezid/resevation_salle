import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../core/services/auth.service';
import { Account } from '../../../core/models/account/account';
import { Profile } from '../../../core/models/profile/profile';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { LoginResponse } from '../../../core/models/login-response/login-response';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  formSubmit = false;
  registerSubs: Subscription;
  profile = {} as Profile;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.registerSubs) { this.registerSubs.unsubscribe(); }
  }

  onSubmit() {
    const values = this.signUpForm.value; // profile with password

    this.profile = values;

    console.log(values);
    console.log(this.profile);

    const keys = Object.keys(values);

    if (this.signUpForm.valid) {
      this.registerSubs = this.authService.register(this.profile, values.password)
        .subscribe((loginResponse: LoginResponse) => {
          const error = loginResponse.error;
          if (error) {
            this.pushErrorFor('email', 'Adresse Email deja utilisé.');
          } else {
            this.eventService.loginEvent();
            this.redirectIfUserLoggedIn();
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

    const password = '';
    const password_confirmation = '';


    this.signUpForm = this.fb.group({
      'first_name': [this.profile.first_name, Validators.required],
      'last_name': [this.profile.last_name, Validators.required],
      'email': [this.profile.email, Validators.compose([Validators.required, Validators.email])],
      'password': [password, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password_confirmation': [password_confirmation, Validators.compose([Validators.required, Validators.minLength(6)])],
      'mobile': [this.profile.mobile,
      Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')])],
    }, { validator: this.matchingPasswords('password', 'password_confirmation') }
    );
  }

  redirectIfUserLoggedIn() {
    this.authService.authorized().subscribe(
      data => {
        if (data.success) { this.router.navigateByUrl('/'); }
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
