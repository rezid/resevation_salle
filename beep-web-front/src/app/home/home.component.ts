import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Room } from '../core/models/room/room';
import { ROOM_LIST } from '../core/mocks/room.mocks';
import { RoomService } from '../core/services/room.service';
import { RoomResponse } from '../core/models/room-response/room-response';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  rooms: Room[];
  roomsSub: Subscription;


  constructor(
    private roomService: RoomService
  ) {

  }

  ngOnInit() {
    // Get all rooms for the room list component
    this.roomsSub = this.roomService.getAllRooms().subscribe((roomResponse: RoomResponse) => {
      this.rooms = roomResponse.rooms;
    });
  }

  ngOnDestroy(): void {
    this.roomsSub.unsubscribe();
  }
}
