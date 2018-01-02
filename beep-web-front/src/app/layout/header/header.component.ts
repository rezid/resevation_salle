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

  postal_code: string = null;

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  refresh() {
    this.eventService.addRoomEvent();
    this.router.navigateByUrl('/');
  }

  search() {
    if (this.postal_code != null) {
      this.eventService.newSearchEvent({
        count: 1,
        search_criteria_list: [
          {
            name: 'postal_code',
            value: this.postal_code,
          },
        ],
      });
    } else {
      this.eventService.newSearchEvent({
        count: 0,
        search_criteria_list: [],
      });

    }
  }
}
