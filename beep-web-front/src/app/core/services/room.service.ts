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
import { Room } from '../models/room/room';
import { RoomResponse } from '../models/room-response/room-response';
import { EventService } from './event.service';


@Injectable()
export class RoomService {


    constructor(
        private http: HttpService,
        private eventService: EventService,
    ) {

    }

    getAllRooms(): Observable<RoomResponse> {
        return this.http.get('rooms').map((response: Response) => {
            console.log(`RoomService::getAllRooms() => ${response.json()}`);
            return response.json();
        });
    }

    addRoom(room: Room): boolean {
        // Need user be authenthified
        this.eventService.authSubject.map(object => {
            if (!object.isAuth) {
                return false;
            } else {

                // if authenthified
                return this.http.post('rooms', room).map((response: Response) => {
                    console.log(response.json());
                    return !response.json().error;
                });
            }

        });

        return false;
    }

    getRoomById(roomid: string): Observable<RoomResponse> {
        return this.http.get(`rooms/${roomid}`).map((response: Response) => {
            console.log(`RoomService::getRoomById() => ${response.json()}`);
            return response.json();
        });
    }


}
