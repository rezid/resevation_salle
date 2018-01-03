import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-taxons',
  templateUrl: './taxons.component.html',
  styleUrls: ['./taxons.component.scss']
})
export class TaxonsComponent implements OnInit {
  taxonomies = [{ name: 'Fête', isChecked: false }, { name: 'Musique', isChecked: false },
  { name: 'Anniversaire', isChecked: false }, { name: 'Mariage', isChecked: false }];


  constructor(
    private eventService: EventService) {
  }

  ngOnInit() {
  }

  search() {
    const criteria_serch_list = this.eventService.searchEvent.getValue();
    let type = '';

    for (const taxon of this.taxonomies) {
      if (taxon.isChecked) {
        type = type + ' ' + taxon.name;
      }
    }



    for (const i in criteria_serch_list.search_criteria_list) {
      if (criteria_serch_list.search_criteria_list[i].name === 'type') {
        if (type === '') {
          criteria_serch_list.count--;

          criteria_serch_list.search_criteria_list.splice(parseInt(i, 10), 1);
          this.eventService.newSearchEvent(criteria_serch_list);
          return;
        }
        criteria_serch_list.search_criteria_list[i].value = type;
        this.eventService.newSearchEvent(criteria_serch_list);
        return;
      }
    }

    criteria_serch_list.count++;
    criteria_serch_list.search_criteria_list.push({ name: 'type', value: type });
    this.eventService.newSearchEvent(criteria_serch_list);


  }

  taxonSelected(taxon, checked) {
    taxon.isChecked = checked;

    this.search();
  }
}
