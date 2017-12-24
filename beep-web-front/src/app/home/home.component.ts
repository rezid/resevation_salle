import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data-service/data.service';
import { Observable } from 'rxjs/Observable';
import { Room } from '../core/models/room/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  room_list: Observable<Room[]>;

  constructor(
    private data: DataService,
  ) { }

  ngOnInit() {
    this.room_list = this.data.getAllRooms(); // for now, the list of room in home is the list of all rooms
  }

}
