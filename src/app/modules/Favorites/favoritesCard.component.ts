import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CharacterService } from "src/app/Services/character.service";
import { ComicClass } from "../Shared/comic/comics";

@Component({
  selector: 'favoritesCard',
  templateUrl: './favoritesCard.component.html',
  styleUrls:['./favoritesCard.component.css']
})
export class FavoritesCard implements OnInit{
  @Input() id: number;
  @Output() idToDelete:  EventEmitter<number> = new EventEmitter;
  @Output() comicOpen: EventEmitter<number> = new EventEmitter;
  url: string = 'http://gateway.marvel.com/v1/public/comics/';
  comic: ComicClass = new ComicClass();
  thumbnail: string = '';

  /**
   *
   */
  constructor(private characterservice: CharacterService) { }
  ngOnInit(): void {
    this.loadComic(this.id);
  }

  loadComic(id: number){
    this.characterservice.getComic(this.url + id.toString()).subscribe(result =>{
      let temp = result.data?.results[0];
      this.comic= {
        id: temp.id,
        title: temp.title,
        prices: temp.prices,
        thumbnail: temp.thumbnail,
        description: temp.description,
      }
      this.thumbnail=`${this.comic.thumbnail.path}.${this.comic.thumbnail.extension}`
    });
  }

  removeFavorite(){
    this.idToDelete.emit(this.comic.id);
  }
  openComic(){
    this.comicOpen.emit(this.comic.id);
  }

}
