import { EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";
import { characterModel, ComicSummary } from "src/app/Characters/character";
import { CharacterService } from "src/app/Services/character.service";
import { FavoritesList } from "../../Favorites/favoritesList.component";
import { ComicClass } from "../comic/comics";

@Component({
  selector:'characterCard',
  templateUrl: './character.component.html',
  styleUrls:['./character.component.css']
})

export class characterCard implements OnInit{
  @Input() public character: characterModel = new characterModel();
  @Input() public comicId!: number;
  @Output() comicIdChange: EventEmitter<number> = new EventEmitter();
  @Input() public index: number;


  @ViewChild('comicModal', { static: true }) public contentModal;
  @ViewChild('characterModal',{static: true}) public charactModal;
  @ViewChild('favList', { static: true }) public favList: FavoritesList;

  id: number = 0;
  title: string = '';
  description: string = '';
  thumbnail: string = '';
  comicThumbnail: string = '';
  comics: ComicSummary[] = [new ComicSummary()];
  comicToShow: ComicSummary;
  theComic: ComicClass = new ComicClass;
  name: string;
  spinner: boolean = false;

  isSeeMore: boolean = false;
  isReadMore: boolean = false;
  favorite: boolean = false;


  constructor(private characterService: CharacterService,private modalService: MDBModalService) {
  }


  ngOnInit(): void {
    this.spinner=true;
    this.loadCharacter();
  }
  ngOnChanges(changes){
    if(this.index < 1)
    {
     if(changes.comicId.currentValue != undefined && changes.comicId.currentValue > 0 && !this.spinner)
     {
      this.openFavoriteComic(this.comicId);
      this.comicId = -1;
      this.comicIdChange.emit(this.comicId);
     }
    }
  }


  loadCharacter(): void{
    this.title = this.character.name;
    this.description = this.character.description;
    this.thumbnail = `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    this.comics = this.character.comics.items.slice(0,4);
    this.spinner = false;
  }

  getComic(item: ComicSummary)
  {
    this.spinner = true;
    this.comicToShow = item;
    this.characterService.getComic((this.comicToShow.resourceURI || '').toString()).subscribe(result =>{
      let temp = result.data?.results[0];
      this.theComic= {
        id: temp.id,
        title: temp.title,
        prices: temp.prices,
        thumbnail: temp.thumbnail,
        description: temp.description,
      }
      this.comicThumbnail = `${this.theComic.thumbnail.path}.${this.theComic.thumbnail.extension}`;
      this.favorite = this.characterService.list.includes(Number(this.theComic.id));
    });
    this.contentModal.show();
    this.spinner=false;

  }
  openFavoriteComic(id: number)
  {
    const comicId={
      resourceURI:`http://gateway.marvel.com/v1/public/comics/${id}`,
      name:''
    };
    this.getComic(comicId);
  }

  addFavorite(id: number){
    this.characterService.addFav(id);
    this.favorite = true;
  }
  removeFavorite(id: number){
    this.characterService.removeFav(id);
    this.favorite = false;
  }
  showText(){
    this.charactModal.show();
  }
  closeModal(){
    this.contentModal.hide();
    this.charactModal.hide();
    this.isReadMore = false;
  }
  readMore(){
    this.isReadMore = !this.isReadMore;
  }
  search(){
    window.location.href = `https://marvel.fandom.com/es/wiki/Especial:Buscar?query=${this.title}&scope=internal&navigationSearch=true`;
  }

}
