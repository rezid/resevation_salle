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



  search() {

    const criteria_serch_list = this.eventService.searchEvent.getValue();

    for (const i in criteria_serch_list.search_criteria_list) {
      if (criteria_serch_list.search_criteria_list[i].name === 'postal_code') {
        criteria_serch_list.count--;
        criteria_serch_list.search_criteria_list.splice(parseInt(i, 10), 1);
        break;
      }
    }


    if (this.postal_code != null) {

      criteria_serch_list.search_criteria_list.push({
        name: 'postal_code',
        value: this.postal_code,
      });

      criteria_serch_list.count++;
      this.eventService.newSearchEvent(criteria_serch_list);
    } else {
      this.eventService.newSearchEvent(criteria_serch_list);

    }
  }
}
