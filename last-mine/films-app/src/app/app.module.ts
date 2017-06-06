import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FilmComponent, ActorDialog } from './film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    ActorDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdDialogModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ActorDialog ]
})
export class AppModule { }
