import { Component, OnInit, Input } from '@angular/core';
import { PostService } from './../app.service'
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  providers: [PostService] // Provider for Service
})
export class FilmComponent implements OnInit {
  @Input() film;

  public imageUrl: string = '';
  public imageActor: string = '';
  public poster_path: string = '';
  public base_url: string = '';

  public cast: Array<Object> = [];
  private actorMap: Map<number, string> = new Map<number, string>();

  constructor(
      private service: PostService,
      private dialog: MdDialog
  ){}

  ngOnInit() {
    this.poster_path = this.film.poster_path;
    this.service.getactor(this.film.id).subscribe(result => {
        this.actorMap.clear;
        for (const actor of result.cast) { 
          this.actorMap.set(actor.cast_id, (actor.profile_path));
        }
        this.cast = result.cast;
      });

    this.service.getimage().subscribe(result => {
      this.base_url = result.images.base_url;
      this.imageUrl = result.images.base_url + 'w92' + this.poster_path;
    });
  }

  public actor(id){
    let url = null;
    if (this.actorMap.get(id) != null) { //if map have image url.
      url = this.base_url + 'h632' + this.actorMap.get(id);
    }
    
    const dialogRef = this.dialog.open(ActorDialog);
    const instance = dialogRef.componentInstance; //Insert data to dialog component.
    instance.image = url;
  }

}
//Dialog.
@Component({
  selector: 'app-actor-dialog',
  templateUrl: './actor-dialog.html',
  styles: ['.close { cursor:pointer;} ']
})
export class ActorDialog {
  public image: string = '';

  constructor(public dialogRef: MdDialogRef<ActorDialog>) { }
}
