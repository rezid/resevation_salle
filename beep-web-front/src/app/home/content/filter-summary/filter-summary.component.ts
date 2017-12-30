
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { SearchCriteriaList, SearchCriteria } from '../../../core/models/search-criteria/search-criteria';

@Component({
  selector: 'app-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.scss']
})
export class FilterSummaryComponent implements OnInit {
  filters: SearchCriteria[];

  constructor(
    public eventService: EventService
  ) {
    eventService.searchEvent.subscribe((search: SearchCriteriaList) => {
      this.filters = search.search_criteria_list;
    });
  }

  ngOnInit() {
  }

  change_name(name: string) {
    if (name === 'postal_code') {
      return 'code postal';
    }
  }



}
