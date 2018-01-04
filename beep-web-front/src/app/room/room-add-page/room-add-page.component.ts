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
import { LoginResponse } from '../../core/models/login-response/login-response';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { Room } from '../../core/models/room/room';
import { RoomService } from '../../core/services/room.service';


@Component({
  selector: 'app-room-add-page',
  templateUrl: './room-add-page.component.html',
  styleUrls: ['./room-add-page.component.scss']
})
export class RoomAddPageComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  formSubmit = false;
  email: string;
  authSub: Subscription;
  eventSub: Subscription;
  roomSubs: Subscription;
  room: Room;
  picture = '';

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private roomService: RoomService,
  ) {

    this.authSub = this.authService.authorized().subscribe(
      (logineResponse: LoginResponse) => {
        if (logineResponse.success) {
          this.email = logineResponse.success.email;
        }
      }
    );

    this.eventSub = this.eventService.authSubject.subscribe(obj => {
      this.authSub = this.authService.authorized().subscribe(
        (logineResponse: LoginResponse) => {
          if (logineResponse.success) {
            this.email = logineResponse.success.email;
          }
        }
      );
      if (!obj.isAuth) {
        this.router.navigateByUrl('/login');
      }
    });

  }

  ngOnDestroy() {
    if (this.authSub) { this.authSub.unsubscribe(); }
    if (this.eventSub) { this.eventSub.unsubscribe(); }
    if (this.roomSubs) { this.eventSub.unsubscribe(); }
  }

  ngOnInit() {
    this.initForm();
  }



  onSubmit() {
    const values = this.signUpForm.value; // profile with password
    values.country = 'France';
    values.email_owner = this.email;
    this.room = values;

    const keys = Object.keys(values);

    if (this.signUpForm.valid) {
      this.roomSubs = this.roomService.addRoom(this.room)
        .subscribe((success: any) => {
          const error = !success.success;
          if (error) {
            this.pushErrorFor('name', 'Une erreur est survenu.');
          } else {
            this.eventService.addRoomEvent();
            this.eventService.newSearchEvent({ count: 0, search_criteria_list: [] });

            // test if pecture then addPicture to room
            if (this.picture !== '') {
              this.roomService.addPicture(this.picture, success.id_room);
            }
            this.router.navigateByUrl('/');
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

    const type = '';
    const name = '';
    const capacity = '';
    const room_number = '';
    const size = '';
    const price = '';
    const street_number = '';
    const street_name = '';
    const city = '';
    const postal_code = '';
    const description = '';


    this.signUpForm = this.fb.group({
      'type': [type, Validators.required],
      'name': [name, Validators.required],
      'capacity': [capacity, Validators.required],
      'room_number': [room_number, Validators.required],
      'size': [size, Validators.required],
      'price': [price, Validators.required],
      'street_number': [street_number, Validators.required],
      'street_name': [street_name, Validators.required],
      'city': [city, Validators.required],
      'postal_code': [postal_code, Validators.required],
      'description': [description, Validators.required]
    });
  }


  openFile(event) {
    const input = event.target;
    for (let index = 0; index < input.files.length; index++) {
      const reader = new FileReader();
      reader.onload = () => {
        // this 'text' is the content of the file
        this.picture = reader.result;

      };
      reader.readAsText(input.files[index]);
    }
  }

}
