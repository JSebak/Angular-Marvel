import { Component, OnInit } from '@angular/core';
import { characterModel } from './Characters/character';
import { CharacterService } from './Services/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'My-Marvel-API';
    /**
   *
   */
  constructor(private characterService: CharacterService) {
  }

}
