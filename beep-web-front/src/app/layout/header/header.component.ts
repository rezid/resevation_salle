import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private eventService: EventService,
  ) {
  }

  ngOnInit() {
  }

  refresh() {
    this.eventService.addRoomEvent();
  }
}
