import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
import { SearchCriteriaList } from '../models/search-criteria/search-criteria';

@Injectable()
export class EventService {

    public authSubject = new BehaviorSubject({ isAuth: false });
    public roomAddedSubject = new Subject();

    public searchEvent = new BehaviorSubject({
        count: 0,
        search_criteria_list: []
    });

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

    newSearchEvent(searchCriteriaList: SearchCriteriaList) {
        this.searchEvent.next(searchCriteriaList);
    }


    addNewSearchEvent(name: string, value: string) {
        const search: SearchCriteriaList = this.searchEvent.getValue();
        for (const i in search.search_criteria_list) {
            if (search.search_criteria_list[i].name === 'sort') {
                search.search_criteria_list[i].value = value;
                console.log(search);
                this.searchEvent.next(search);
                return;
            }
        }

        search.count++;
        search.search_criteria_list.push({ name: name, value: value });
        console.log(search);
        this.searchEvent.next(search);
    }




}
