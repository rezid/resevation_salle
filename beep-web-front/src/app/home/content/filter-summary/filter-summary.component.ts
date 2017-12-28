
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.scss']
})
export class FilterSummaryComponent implements OnInit {
  filters$: Observable<any>;

  constructor() {
    this.filters$ = Observable.of([{ name: 'Fête', }]);
  }

  ngOnInit() {
  }



}
