import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { characterModel, ComicSummary } from "../Characters/character";
import { BaseResultModel } from "../modules/Shared/baseResponse";
import { ComicClass } from "../modules/Shared/comic/comics";


@Injectable(
  {providedIn: 'root',}
  )
export class CharacterService{

  private readonly publicKey: string = '768ae247d64b5f23b417508f4ed1d3df';
  private readonly privateKey: string = '666030a669c778d8fd747422ce5bf01091dbce8c';
  //private readonly MD5Hash: string = `1${this.privateKey}${this.publicKey}`;
  private readonly hash: string ='92ca6274df30cceefca4e4dd7d951e45';
  public readonly apiKeyHash: string = `ts=1&apikey=${this.publicKey}&hash=${this.hash}`;


  private _url = 'http://gateway.marvel.com/v1/public/';


  list:number[] = [];
  constructor(private http:HttpClient) {
    this.list.push(15770);
  }
  getFavs(): number[]{
    return this.list;
  }

  addFav(id: number){
    if(this.list.indexOf(id)==-1)
    {
      this.list.push(id);
    }
  }

  removeFav(id: number){
    this.list.forEach((value,index)=>{
      if(value==id) this.list.splice(index,1);
    });
  }

  clearFavorites(){
    this.list.splice(0,this.list.length);
  }


  getCharacterHttp(id: number): Observable<characterModel>{
    const endpoint = 'characters/';
    return this.http.get<characterModel>(`${this._url}${endpoint}${id}?${this.apiKeyHash}`);
  }
  getCharactersHttp(off: number,name: string =''): Observable<BaseResultModel<characterModel[]>>{
    const endpoint = 'characters';
    const limit = '&limit=100';
    const modified = '';
    const offset = '&offset=';
    let nameStartsWith = '';
    const order = '';
    if(name!='')
    {
      nameStartsWith=`&nameStartsWith=${name}`;
    }
    return this.http.get<BaseResultModel<characterModel[]>>(`${this._url}${endpoint}?${this.apiKeyHash}${nameStartsWith}${modified}${order}${offset}${off}${limit}`);
  }

  getComic(id: string): Observable<BaseResultModel<ComicClass>>{
    return this.http.get<BaseResultModel<ComicClass>>(`${id}?${this.apiKeyHash}`)
  }
}
 //https://gateway.marvel.com:443/v1/public/characters?name=Thor&modifiedSince=2012&orderBy=name&limit=20&offset=100&apikey=768ae247d64b5f23b417508f4ed1d3df

 // Buscar en todos los resutlados de la API ##############IMPORTANT
