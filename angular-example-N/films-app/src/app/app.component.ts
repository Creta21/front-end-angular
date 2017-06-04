import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  films = [];
  filmWeLikeThisWeekTitle = 'Zorba the greek';
  filmWeLikeThisWeekResult: any;
  noFilmFound = false;

  constructor(private http: Http) { }

  /* tslint:disable */
  ngOnInit() {

    // Search and store for 'this.filmWeLikeThisWeekTitle' film in order to display it at the beggining
    this.http
      .get('https://api.themoviedb.org/3/search/movie?api_key=2e43d574295b83df464afb53cd8cbef9&language=en-US&query=' + this.filmWeLikeThisWeekTitle + '&page=1&include_adult=false')
      .map(response => response.json())
      .subscribe(data => {
        this.films = data.results;
        this.filmWeLikeThisWeekResult = this.films[0];
        this.films = [];
      });
  }

  searchForfilm(value: any) {
    if (value.filmTitleToSearch.trim() === '') {  // empty value
      this.films = [];
    }
    else {
      this.http
        .get('https://api.themoviedb.org/3/search/movie?api_key=2e43d574295b83df464afb53cd8cbef9&language=en-US&query=' + value.filmTitleToSearch + '&page=1&include_adult=false')
        .map(response => response.json())
        .subscribe(data => {
          this.films = data.results;
          this.noFilmFound = true;
        });
    }
  }
}
