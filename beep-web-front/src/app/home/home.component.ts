import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Room } from '../core/models/room/room';
import { ROOM_LIST } from '../core/mocks/room.mocks';
import { RoomService } from '../core/services/room.service';
import { RoomResponse } from '../core/models/room-response/room-response';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  rooms: Room[];
  roomsSub: Subscription;
  roomsSearchedSub: Subscription;
  searchSubs: Subscription;

  roomAddedSubjectInscription: Subscription;

  constructor(
    private roomService: RoomService,
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    // Get all rooms for the room list component each time a new event is here
    this.roomAddedSubjectInscription = this.eventService.roomAddedSubject.subscribe(() => {
      this.roomsSub = this.roomService.getAllRooms().subscribe((roomResponse: RoomResponse) => {
        this.rooms = roomResponse.rooms;
        this.changeDetectorRef.detectChanges();
      });
    });

    this.searchSubs = this.eventService.searchEvent.subscribe(search => {
      this.roomsSearchedSub = this.roomService.getRoomBySearchCriteriaList(search).subscribe((roomResponse: RoomResponse) => {
        this.rooms = roomResponse.rooms;
        this.changeDetectorRef.detectChanges();
      });
    });

    this.eventService.addRoomEvent();
  }

  ngOnDestroy(): void {
    this.roomAddedSubjectInscription.unsubscribe();
    this.roomsSub.unsubscribe();
  }
}
