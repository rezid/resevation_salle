import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';

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
export class EventService {

    public authSubject = new Subject<{ isAuth: boolean }>();
    public roomAddedSubject = new Subject();

    constructor(private authService: AuthService) {
        authService.authorized().subscribe(
            (loginResponse: LoginResponse) => {
                if (loginResponse.success) {
                    this.authSubject.next({ isAuth: true });
                } else { this.authSubject.next({ isAuth: false }); }
            }
        );
    }

    loginEvent() {
        this.authSubject.next({ isAuth: true });
    }

    logoutEvent() {
        this.authSubject.next({ isAuth: false });
    }


    addRoomEvent() {
        this.roomAddedSubject.next();
    }


}
