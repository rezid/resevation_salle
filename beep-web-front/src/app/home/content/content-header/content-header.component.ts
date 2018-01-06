import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  @Output() toggleSize = new EventEmitter();
  selectedSize = 'COMPACT';

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
  }

  toggleView(view) {
    this.selectedSize = view;
    this.toggleSize.emit({ size: view });
  }

  isSmallSelected(): boolean {
    return this.selectedSize === 'COZY';
  }

  isBigSelected(): boolean {
    return this.selectedSize === 'COMPACT';
  }


  sort_new() {
    this.eventService.addNewSearchEvent('sort', 'new');
  }
  sort_old() {
    this.eventService.addNewSearchEvent('sort', 'old');
  }
  sort_price_low() {
    this.eventService.addNewSearchEvent('sort', 'price_low');
  }
  sort_price_high() {
    this.eventService.addNewSearchEvent('sort', 'price_high');
  }


}
