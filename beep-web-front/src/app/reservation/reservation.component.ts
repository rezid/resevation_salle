import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Reservation } from '../core/models/reservation/reservation';
import { Room } from '../core/models/room/room';
import { RoomService } from '../core/services/room.service';
import { RoomResponse } from '../core/models/room-response/room-response';
import { ReservationService } from '../core/services/reservation.service';
import { ReservationResponse } from '../core/models/reservation-response/reservation-response';
import { Observable } from 'rxjs/Observable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations$: Observable<Reservation[]>;
  room: Room;
  room_id: string;

  signInForm: FormGroup;
  title = 'Beep';
  returnUrl: string;
  registerSubs: Subscription;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {

    this.route.params.subscribe(
      (params: any) => {
        this.room_id = params['id_room'];
        this.roomService
          .getRoomById(this.room_id)
          .subscribe((roomResponse: RoomResponse) => {
            (roomResponse.count === 1) ? (this.room = roomResponse.rooms[0]) : (this.room = null);
          });


        this.reservations$ = reservationService.getAllReservationByRoomId(this.room_id)
          .map((reservationResponse: ReservationResponse) => {
            return reservationResponse.reservations;
          });
      }
    );
  }

  ngOnInit() {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    const start_and_end_date = this.signInForm.value;
    const keys = Object.keys(start_and_end_date);

    const reservation: Reservation = {
      id_room: this.room_id,
      end_date: start_and_end_date.end_date,
      start_date: start_and_end_date.start_date
    };

    if (this.signInForm.valid) {
      this.registerSubs = this.reservationService.makeReservation(reservation)
        .subscribe((error: boolean) => {
          if (error) {
            this.pushErrorFor('start_date', 'Impossible de reserver pour ses dates.');
          } else {
            this.router.navigateByUrl(`/room/${this.room_id}`);
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
    const start_date = '';
    const end_date = '';

    this.signInForm = this.fb.group({
      'start_date': [start_date, Validators.required],
      'end_date': [end_date, Validators.required]
    });
  }


}
