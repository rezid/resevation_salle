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
import { SearchCriteriaList } from '../models/search-criteria/search-criteria';


@Injectable()
export class RoomService {


    constructor(
        private http: HttpService,
        private eventService: EventService,
    ) { }

    getAllRooms(): Observable<RoomResponse> {
        return this.http.get('rooms').map((response: Response) => {

            return response.json();
        });
    }

    addRoom(room: Room): Observable<any> {
        return this.http.post('rooms', room).map((response: Response) => {
            const success = !response.json().error;
            if (success) {
                this.eventService.addRoomEvent();
            }

            return { success: success, id_room: response.json().id_room };
        });
    }

    getRoomById(roomid: string): Observable<RoomResponse> {
        return this.http.get(`rooms/${roomid}`).map((response: Response) => {
            return response.json();
        });
    }

    getRoomBySearchCriteriaList(searchCriteriaList: SearchCriteriaList): Observable<RoomResponse> {
        const temp = {};

        for (const search_criteria of searchCriteriaList.search_criteria_list) {
            temp[search_criteria.name] = search_criteria.value;
        }

        return this.http.post(`rooms/search`, temp).map((response: Response) => {

            return response.json();
        });

    }

    addPicture(picture: string, id_room: string): Observable<boolean> {
        console.log('addPicture()');
        return this.http.post('pictures', { id_room: id_room, picture: picture }).map((response: Response) => {
            console.log('addPicture()');
            return true;
        });
    }

}
