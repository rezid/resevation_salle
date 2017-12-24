import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../core/models/room/room';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../core/services/data-service/data.service';
import { Profile } from '../core/models/profile/profile';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../core/models/reservation/reservation';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() roomId: string;
  reservationList$: Observable<Reservation[]>;

  room: Room;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        this.roomId = params['id'];
        this.data
          .getRoomByRoomId(this.roomId)
          .subscribe(room => this.room = room);
        this.data
          .getProfileByRoomId(this.roomId)
          .subscribe(profile => this.profile = profile);
        this.reservationList$ = this.data.getReservationListByRoomId(this.roomId);
      });
  }



}
