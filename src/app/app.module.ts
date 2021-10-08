import { NgxPaginationModule } from 'ngx-pagination';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { dashboard } from './modules/Dashboard/dashboard.component';
import { FavoritesCard } from './modules/Favorites/favoritesCard.component';

import { navbar } from './modules/Shared/Nav/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { characterCard } from './modules/Shared/Card/character.component';
import { FavoritesList } from './modules/Favorites/favoritesList.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { LoadingSpinner } from './modules/Shared/Spinner/spinner.component';


@NgModule({
  declarations: [
    dashboard,
    AppComponent,
    FavoritesCard,
    navbar,
    characterCard,
    FavoritesList,
    FilterPipe,
    LoadingSpinner,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
