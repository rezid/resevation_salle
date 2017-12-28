import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../core/models/room/room';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room: Room;

  constructor() {
  }

  ngOnInit() {
  }
}
