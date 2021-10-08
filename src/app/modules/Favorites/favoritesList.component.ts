import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CharacterService } from "src/app/Services/character.service";

@Component({
  selector: 'favoriteList',
  templateUrl:'./favoritesList.component.html',
})
export class FavoritesList{
  @Input() id: number;
  @Output() public comicToOpen: EventEmitter<number> = new EventEmitter;
  list: number[] = [];

  /**
   *
   */
  constructor(public characterService: CharacterService) {
    this.list = this.characterService.getFavs();
  }

  addFavorite(id: number){
    this.characterService.addFav(id);
  }
  removeFavorite(id: number){
    this.characterService.removeFav(id);
  }
  openComic(id: number){
    this.comicToOpen.emit(id);
  }

}
