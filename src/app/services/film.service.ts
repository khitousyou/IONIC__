import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { IFilms } from '../interface/Film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private url: string = "";
  private apiKey: string = "a4f05c48";

  constructor(private http: HttpClient) { }

  searchFilms(title: string, type: string) {
    this.url = `http://www.omdbapi.com/?s=${title}&type=${type}&apiKey=${this.apiKey}`;
    return this.http.get<any>(this.url).pipe(map(results => results&&results["Search"]),
      catchError(err => of(err))

    )
  }

  getDetailsFilm(id: string) {
    return this.http.get<IFilms>(`http://www.omdbapi.com/?i=${id}&plot=full&apiKey=${this.apiKey}`)
  }
}
