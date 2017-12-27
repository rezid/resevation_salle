import { Room } from './../../core/models/room/room';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  //   styleUrls: ['./content-header.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() rooms: Room[];

  toggleLayout = { size: 'COZY' };

  constructor() { }

  ngOnInit() {
  }

  toggleSize(layoutInfo) {
    this.toggleLayout = layoutInfo;
  }

}
