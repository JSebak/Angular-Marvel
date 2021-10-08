export class characterModel{

  id: number;
  name: string;
  description: string;
  modified: Date | null | undefined = null;
  resourceURI: string | null | undefined =  null;
  urls: string[] | null = null;
  thumbnail: Image;
  comics: ComicList;
  stories: any = null;
  events: any = null;
  series: any = null;
  /**
   *
   */
  constructor() {
  this.id = 0;
  this.name = '';
  this.description = '';
  this.comics = new ComicList();
  this.thumbnail = new Image();

  }
}
export class Image{
    path: string;
    extension: string;

    constructor() {
      this.path = '';
      this.extension = '';
    }
}

export class ComicList {
  available: number | null;
  returned: number;// The number of issues returned in this collection (up to 20).,
  collectionURI: string | null; // The path to the full list of issues in this collection.,
  items: ComicSummary[]; // The list of returned issues in this collection.

  /**
   *
   */
  constructor() {
    this.available = 0;
    this.returned = 0;
    this.collectionURI = '';
    this.items = [new ComicSummary()]
  }

  }
  export class ComicSummary {
  resourceURI: string | null;//The path to the individual comic resource.,
  name: string;// The canonical name of the comic.


  constructor() {
    this.resourceURI = null;
    this.name ='';
  }

  }
