import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { LoginResponse } from '../core/models/login-response/login-response';
import { EventService } from '../core/services/event.service';
import { AuthService } from '../core/services/auth.service';
import { Room } from '../core/models/room/room';
import { RoomService } from '../core/services/room.service';
import { SearchCriteriaList } from '../core/models/search-criteria/search-criteria';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  signUpForm: FormGroup;
  formSubmit = false;
  eventSub: Subscription;
  searchCriteriaList: SearchCriteriaList;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,

  ) {


  }

  ngOnInit() {
    this.initForm();
  }



  onSubmit() {
    const values = this.signUpForm.value; // profile with password
    const keys = Object.keys(values);

    this.searchCriteriaList = { count: 0, search_criteria_list: [] };

    if (values.size_min) {
      this.searchCriteriaList.count = this.searchCriteriaList.count + 1;
      this.searchCriteriaList.search_criteria_list.push({ name: 'size_min', value: values.size_min });
    }

    if (values.size_max) {
      this.searchCriteriaList.count = this.searchCriteriaList.count + 1;
      this.searchCriteriaList.search_criteria_list.push({ name: 'size_max', value: values.size_max });
    }

    if (values.price_min) {
      this.searchCriteriaList.count = this.searchCriteriaList.count + 1;
      this.searchCriteriaList.search_criteria_list.push({ name: 'price_min', value: values.price_min });
    }

    if (values.price_max) {
      this.searchCriteriaList.count = this.searchCriteriaList.count + 1;
      this.searchCriteriaList.search_criteria_list.push({ name: 'price_max', value: values.price_max });
    }

    if (values.postal_code) {
      this.searchCriteriaList.count = this.searchCriteriaList.count + 1;
      this.searchCriteriaList.search_criteria_list.push({ name: 'postal_code', value: values.postal_code });
    }

    this.eventService.newSearchEvent(this.searchCriteriaList);
    this.router.navigateByUrl('/');


  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.signUpForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }

  initForm() {

    const size_min = '';
    const size_max = '';
    const price_min = '';
    const price_max = '';
    const postal_code = '';

    this.signUpForm = this.fb.group({
      'size_min': [size_min, Validators.required],
      'size_max': [size_max, Validators.required],
      'price_min': [price_min, Validators.required],
      'price_max': [price_max, Validators.required],
      'postal_code': [postal_code, Validators.required],
    });
  }

}
