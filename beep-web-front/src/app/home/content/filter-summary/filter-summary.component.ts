
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
      return 'Code Postal';
    } else if (name === 'price_min') {
      return 'Prix Min';
    } else if (name === 'price_max') {
      return 'Prix Max';
    } else if (name === 'size_min') {
      return 'Taille Min';
    } else if (name === 'size_max') {
      return 'Taille Max';
    } else if (name === 'type') {
      return 'Type';
    } else if (name === 'sort') {
      return 'Trie';
    }
  }



}
