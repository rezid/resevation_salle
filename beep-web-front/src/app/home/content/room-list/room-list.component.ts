
import { Observable } from 'rxjs/Observable';
import { Room } from './../../../core/models/room/room';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() toggleLayout;

  constructor() { }

  ngOnInit() { }

  getProductImageUrl(url) {
    return 'xxx';
  }

  addToCart(room: Room) {
    const variant_id = room._id;
  }

  getMargin() {
    return this.toggleLayout.size === 'COZY' ? '0 15px 20px 0' : '0 80px 20px 0';
  }

}
