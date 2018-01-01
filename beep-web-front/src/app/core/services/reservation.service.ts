import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { Profile } from '../models/profile/profile';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

import { LoginResponse } from '../models/login-response/login-response';
import { Reservation } from '../models/reservation/reservation';
import { ReservationResponse } from '../models/reservation-response/reservation-response';
import { EventService } from './event.service';


@Injectable()
export class ReservationService {


    constructor(
        private http: HttpService,
        private eventService: EventService,
    ) {

    }

    getAllReservationByRoomId(room_id: string): Observable<ReservationResponse> {
        return this.http.get(`reservations/${room_id}`).map((response: Response) => {
            return response.json();
        });
    }

    makeReservation(reservation: Reservation): Observable<boolean> {
        return this.http.post(`reservations/`, reservation).map((response: Response) => {
            if (response.json().error) {
                return true;
            } else {
                return false;
            }
        });
    }


}
