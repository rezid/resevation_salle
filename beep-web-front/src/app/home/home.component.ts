import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Room } from '../core/models/room/room';
import { ROOM_LIST } from '../core/mocks/room.mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms$: Observable<Room[]>;


  constructor() {
    // Get all rooms for the room list component
    this.rooms$ = Observable.of(ROOM_LIST);
  }

  ngOnInit() { }

}
