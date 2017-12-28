import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-taxons',
  templateUrl: './taxons.component.html',
  styleUrls: ['./taxons.component.scss']
})
export class TaxonsComponent implements OnInit {
  taxonomies = [{ name: 'Musique' }, { name: 'Anniversaire' }, { name: 'Mariage' }];


  constructor(
    private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  isChecked(taxon) {
    return false;
  }

  taxonSelected(taxon, checked) {
  }
}
