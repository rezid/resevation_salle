import { environment } from './../../../../../environments/environment';
import { Room } from './../../../../core/models/room/room';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss']
})
export class RoomListItemComponent implements OnInit {
  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

  getProductImageUrl(url) {
    return 'xxx';
  }
}
