import { ComicSummary, Image } from "src/app/Characters/character";


export class ComicClass{
    id: number;
    title: string;
    issueNumber?: any;
    variantDescription?: string;
    description: string;
    modified?: Date;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format?: string;
    pageCount?: number;
    textObjects?: any;
    resourceURI?: string;
    urls?: string[];
    series?: any;
    variants?: any;
    collections?: ComicSummary[];
    collectedIssues?: ComicSummary[];
    dates?: any;
    prices: ComicPrice;
    thumbnail: Image;
    images?: Image[];
    creators?: any;
    characters?: any;
    stories?: any;
    events?: any;


  constructor() {
    this.title='';
    this.description='';
    this.id=0;
    this.thumbnail = new Image;
    this.prices = new ComicPrice;

  }
}

export class ComicPrice {
  type: string = '';
  price: number = 0;
  /**
   *
   */
  constructor() {}
  }
