import { Component, ElementRef, ViewChild } from "@angular/core";
import { MDBModalService } from "angular-bootstrap-md";
import { NgxPaginationModule } from "ngx-pagination";
import { characterModel } from "src/app/Characters/character";
import { CharacterService } from "src/app/Services/character.service";
import { FavoritesCard } from "../Favorites/favoritesCard.component";
import { FavoritesList } from "../Favorites/favoritesList.component";
import { debounceTime, delay } from 'rxjs/operators';

import { characterCard } from "../Shared/Card/character.component";
import { ComicModal } from "../Shared/Modal/modal.component";
import { NavbarComponent } from "angular-bootstrap-md";



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboard {
  @ViewChild('favList',{static: true}) public favoriteList: FavoritesList;
  characters?: characterModel[] = [];
  data: characterModel[];
  comic?: any;
  config= {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      color: '#ffffff',
    };
  comicToRemove: number;
  comicToAdd: number;
  comicToOpen: number;
  stringSearch: string;
  searchResults: characterModel[];
  spinner: boolean = false;
  isSearch: boolean = false;
  total: number;
  debounceTime : number = 0;
  /**
   *
   */
  constructor(private characterService: CharacterService,
    private modalService: MDBModalService) {

  }
  ngOnInit(): void {
    this.spinner = true;
    this.Bring();
  }


  Bring(offset: number = 0, name: string= ''):void{
    this.characterService.getCharactersHttp(offset, name).subscribe(response =>{
      this.data = response.data?.results;
      this.characters = this.characters.concat(this.data);
      this.config.totalItems=this.characters.length;
      this.data = this.characters;
      this.spinner = false;
    });
  }

  handlePageChange(event): void {
    this.config.currentPage = event;
    let eigthty = this.config.totalItems * 0.8;
    if((this.config.currentPage*this.config.itemsPerPage) >= eigthty && !this.isSearch)
    {
      this.spinner=true;
      this.Bring(this.config.totalItems);
    }
    else if(this.config.currentPage * this.config.itemsPerPage >=  this.characters.length && this.isSearch && this.characters.length < this.total)
    {
      this.spinner=true;
      this.bringByName(this.config.totalItems);
    }
  }

  removeFavorite(id:number){
    this.favoriteList.removeFavorite(id);
  }

  addFavorite(id: number){
    this.favoriteList.addFavorite(id);
  }
  filter(search: string){
    this.spinner = true;
    this.isSearch = true;
    this.searchResults=[];
    this.total = 0;
    this.config.currentPage = 1;
    this.stringSearch = search.toLowerCase();
    if (this.stringSearch.length > 0)
      {
        this.searchResults=[];
        this.spinner = true;
        this.bringByName();
      }
      else{
         this.searchResults = [];
         this.characters = this.data;
         this.config.totalItems = this.characters.length;
         this.isSearch = false;
      }
      this.spinner = false;
  }

  private bringByName(offset: number = 0) {
    this.characterService.getCharactersHttp(offset, this.stringSearch).pipe(
      debounceTime(this.debounceTime),).subscribe(result => {
      this.searchResults = this.searchResults.concat(result.data.results);
      this.total = result.data.total;
      this.config.totalItems = this.searchResults.length;
      if(this.characters.length != this.searchResults.length){
        this.characters = this.searchResults;
      }
      this.spinner = false;
    });
  }

  sort(selector: string){
    if(selector.toLowerCase().includes('name'))
    {
      if(selector.toLowerCase().includes('ascending'))
      {
        this.characters.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      else{
        this.characters.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
    }
    if(selector.toLowerCase().includes('date'))
    {
      if(selector.toLowerCase().includes('ascending'))
      {
        this.characters.sort((a, b)=> {return new Date(a.modified).getTime() - new Date(b.modified).getTime()});
      }
      else{
        this.characters.sort((a, b)=> {return new Date(b.modified).getTime() - new Date(a.modified).getTime()});
      }
    }
  }

  openComic(id: number){
    if(id!=undefined)
    {
      this.comicToOpen = id;
    }
  }
}
