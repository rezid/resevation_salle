import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { Room } from '../../models/room/room';
import { ROOM_LIST } from '../../mocks/room.mocks';

@Injectable()
export class DataService {

  constructor() { }


  getAllRooms(): Observable<Room[]> {
    return  Observable.of(ROOM_LIST);
  }

}
