import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-price-info',
  templateUrl: './room-price-info.component.html',
  styleUrls: ['./room-price-info.component.scss']
})
export class RoomPriceInfoComponent implements OnInit {
  @Input() room;
  constructor() { }

  ngOnInit() {
  }

}
