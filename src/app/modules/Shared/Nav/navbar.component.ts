import { Component, EventEmitter, Output } from "@angular/core";


@Component({
  selector: 'navbar',
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class navbar {
  @Output() toSearch: EventEmitter<string> = new EventEmitter();
  search: string = '';
  /**
   *
   */
  constructor() {}

  onKey(search: any){
    this.search = search.target.value;
    this.toSearch.emit(this.search);
  }
}
