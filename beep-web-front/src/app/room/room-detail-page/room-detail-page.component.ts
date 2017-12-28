import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../core/models/room/room';
import { RoomService } from '../../core/services/room.service';
import { RoomResponse } from '../../core/models/room-response/room-response';

@Component({
  selector: 'app-room-detail-page',
  templateUrl: './room-detail-page.component.html',
  styleUrls: ['./room-detail-page.component.css']
})
export class RoomDetailPageComponent implements OnInit {

  room: Room = null;
  roomId: any;

  constructor(private roomService: RoomService,
    private route: ActivatedRoute) {

    /**On Init
     * 1. Parse route params
     * 2. Retrive room id
     * 3. Ask for the room detail based on room id
     * */
    this.route.params.subscribe(
      (params: any) => {
        this.roomId = params['id'];
        this.roomService
          .getRoomById(this.roomId)
          .subscribe((roomResponse: RoomResponse) => {
            (roomResponse.count === 1) ? (this.room = roomResponse.rooms[0]) : (this.room = null);
          });
      }
    );
  }


  ngOnInit() {
  }

  /**
   * Action To be dispatched
   * when added to cart
   */
  addToCart() {
    return;
  }

}
