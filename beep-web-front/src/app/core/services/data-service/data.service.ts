import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { Room } from '../../models/room/room';
import { ROOM_LIST } from '../../mocks/room.mocks';
import { Profile } from '../../models/profile/profile';
import { PROFILE_LIST } from '../../mocks/profile.mocks';
import { Reservation } from '../../models/reservation/reservation';
import { RESERVATION_LIST } from '../../mocks/reservation.mocks';

@Injectable()
export class DataService {

  constructor() { }


  getAllRooms(): Observable<Room[]> {
    return Observable.of(ROOM_LIST);
  }

  getRoomByRoomId(id: string): Observable<Room> {
    return Observable.of(ROOM_LIST[0]);
  }

  getProfileByRoomId(id: string): Observable<Profile> {
    return Observable.of(PROFILE_LIST[0]);
  }

  getReservationListByRoomId(id: string): Observable<Reservation[]> {
    return Observable.of(RESERVATION_LIST);
  }

}
