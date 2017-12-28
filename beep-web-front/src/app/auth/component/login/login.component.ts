import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Account } from '../../../core/models/account/account';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../../../core/services/event.service';
import { LoginResponse } from '../../../core/models/login-response/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  title = 'Beep';
  returnUrl: string;
  registerSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    const emailWithPassword = this.signInForm.value;
    const keys = Object.keys(emailWithPassword);

    if (this.signInForm.valid) {
      this.registerSubs = this.authService.login(emailWithPassword.email, emailWithPassword.password)
        .subscribe((loginResponse: LoginResponse) => {
          const error = loginResponse.error;
          if (error) {
            this.pushErrorFor('email', 'Identifiant ou mot de passe invalide.');
          } else {
            this.eventService.loginEvent();
            this.redirectIfUserLoggedIn();
          }
        });
    } else {
      keys.forEach(val => {
        const ctrl = this.signInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();

        }
      });
    }
  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.signInForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }

  initForm() {
    const email = '';
    const password = '';

    this.signInForm = this.fb.group({
      'email': [email, Validators.required],
      'password': [password, Validators.required]
    });
  }

  redirectIfUserLoggedIn() {
    this.authService.authorized().subscribe(
      data => {
        if (data.success) { this.router.navigateByUrl('/'); }
      }
    );
  }


}
