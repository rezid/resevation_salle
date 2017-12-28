import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './room-images.component.html',
  styleUrls: ['./room-images.component.scss']
})
export class RoomImagesComponent implements OnInit {
  images = ['assets/imgs/image1.jpg', 'assets/imgs/image2.jpg', 'assets/imgs/image3.jpg',
    'assets/imgs/image4.jpg', 'assets/imgs/image5.jpg', 'assets/imgs/image6.jpg',
    'assets/imgs/image7.jpg'];
  selectedImage = this.images[3];

  constructor() { }

  ngOnInit() { }

  onMouseOver(image) {
    this.selectedImage = image;
  }
}
