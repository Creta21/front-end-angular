import { Component, OnInit } from '@angular/core';
import { PostService } from './app.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService] // Provider for Service
})

export class AppComponent implements OnInit {
  public searchForm: FormGroup; //form name in html.
  public films: Array<Object> = []; // List of movies

  constructor(
        private service: PostService,
        private fb: FormBuilder, // form builder
  ) { }

  ngOnInit() {
      // form name------- Validation...
      this.searchForm = this.fb.group({
            search: ['', [ Validators.required]] // input name, validator.
      });

    this.service.getWeekLikeMovie().subscribe(result => {
      this.films = result.results;
    });
  }

  public search() {
    this.films = []; //Clear the list
    this.service.getMovies((this.searchForm.value.search).trim()).subscribe(result => {
      this.films = result.results; //Save the movies from search result.
    });
  }
}
