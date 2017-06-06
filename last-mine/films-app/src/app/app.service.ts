import {HttpModule, Http,Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
@Injectable()

export class PostService {
  
  WeekLikeMovie_Url: string = 'https://api.themoviedb.org/3/search/movie?api_key=2e43d574295b83df464afb53cd8cbef9&language=en-US&query=Zorba the greek&page=1&include_adult=false';
  image_url: string = 'https://api.themoviedb.org/3/configuration?api_key=2e43d574295b83df464afb53cd8cbef9';
  
  constructor(public http: Http) {}

  getWeekLikeMovie() {
    return this.http.get(this.WeekLikeMovie_Url) .map((res: Response) => { return res.json(); }); 
  }
  getMovies(nameOfMovie: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=2e43d574295b83df464afb53cd8cbef9&language=en-US&query=' + nameOfMovie + '&page=1&include_adult=false') .map((res: Response) => { return res.json(); }); 
  }
  getimage() {
    return this.http.get(this.image_url) .map((res: Response) => { return res.json(); });
  }
  getactor(movieId) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=2e43d574295b83df464afb53cd8cbef9') .map((res: Response) => { return res.json(); });
  }
}
