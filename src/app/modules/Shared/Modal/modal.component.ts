import { Component, Input } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Image } from 'src/app/Characters/character';


@Component({
  selector: 'comic-modal',
  templateUrl: './modal.component.html',
  styleUrls:['./modal.component.css'],
})
export class ComicModal {
  @Input() public comic: any;
  title: string = 'Title';
  description: string = 'Here goes the description';
  image: Image;
  price: number;
  favorite: boolean = false;

  constructor(public comicRef: MDBModalRef) {}
}
