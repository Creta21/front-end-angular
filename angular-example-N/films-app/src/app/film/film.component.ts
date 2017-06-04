import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

// The main Compoment for displaying the film information
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  @Input() film; // The film that will be displayed
  credits: any[]; // The cast of the film
  posterImgSrc = '/assets/images/no-image.png'; // The poster image source. Default value if it is no available

  constructor(private http: Http, public dialog: MdDialog) { }

  /* tslint:disable */
  ngOnInit() {

    // Get the cast for the film
    this.http
      .get('https://api.themoviedb.org/3/movie/' + this.film.id + '/credits?api_key=2e43d574295b83df464afb53cd8cbef9')
      .map(response => response.json().cast as any[])
      .subscribe(data => {
        this.credits = data;
        if (this.film.poster_path != null)
          this.posterImgSrc = 'https://image.tmdb.org/t/p/w92' + this.film.poster_path;
      });
  }

  /* Opens a dialog and displays an image of an actor whose image file name
  is passed as a parameter */
  openActorImageDialog(actorImageSrc: string) {
    let config = new MdDialogConfig();
    let dialogRef: MdDialogRef<ActorImageDialogComponent> = this.dialog.open(ActorImageDialogComponent, config);

    if (actorImageSrc != null)
      dialogRef.componentInstance.imgSrc = 'https://image.tmdb.org/t/p/h632/' + actorImageSrc;

  }
}


// The dialog component for displaying the image
@Component({
  selector: 'app-actor-image-dialog',
  templateUrl: './actor-image-dialog.html',
  styles: ['.close { cursor:pointer;} ']
})
export class ActorImageDialogComponent {
  imgSrc: string;

  constructor(public dialogRef: MdDialogRef<ActorImageDialogComponent>) { }
}