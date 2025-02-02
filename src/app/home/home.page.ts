import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Observable } from 'rxjs/internal/Observable';
import { IFilms } from '../interface/Film';
import { catchError, map, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films$!: Observable<IFilms>;
  films: any = [];
  type: string = "movie";
  // films$ =  {
  //   "Search": [
  //   {
  //   "Title": "Everything Everywhere All at Once",
  //   "Year": "2022",
  //   "imdbID": "tt6710474",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "All Quiet on the Western Front",
  //   "Year": "2022",
  //   "imdbID": "tt1016150",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BMzM4ZDJhYjYtZGY5Ny00NTk0LWI4ZTYtNjczZDFiMGI2ZjEzXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "The Devil All the Time",
  //   "Year": "2020",
  //   "imdbID": "tt7395114",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BZmE1NmVmN2EtMjZmZC00YzAyLWE4MWEtYjY5YmExMjUxODU1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "All About Eve",
  //   "Year": "1950",
  //   "imdbID": "tt0042192",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BYmE1M2Y3NTYtYTI0Mi00N2JlLTkzMzItOTY1MTlhNWNkMDgzXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "The Kids Are All Right",
  //   "Year": "2010",
  //   "imdbID": "tt0842926",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BMjE4NTMwNDg5MF5BMl5BanBnXkFtZTcwNDY2ODE0Mw@@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "All the President's Men",
  //   "Year": "1976",
  //   "imdbID": "tt0074119",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BOWI2YWQxM2MtY2U4Yi00YjgzLTgwNzktN2ExNTgzNTIzMmUzXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "To All the Boys I've Loved Before",
  //   "Year": "2018",
  //   "imdbID": "tt3846674",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ3NjM5MTAzN15BMl5BanBnXkFtZTgwODQzMDAwNjM@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "The Sum of All Fears",
  //   "Year": "2002",
  //   "imdbID": "tt0164184",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BZmFiZDkyYWQtMGNkZi00YmZkLThjNzAtY2U1YTVmYmNlNThmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "Jingle All the Way",
  //   "Year": "1996",
  //   "imdbID": "tt0116705",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BMmJlYzViNzctMjQ1Ni00ZWQ4LThkN2YtMzI2ZGU5Nzk0NTAyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title": "Run All Night",
  //   "Year": "2015",
  //   "imdbID": "tt2199571",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BMTU2ODI3ODEyOV5BMl5BanBnXkFtZTgwMTM3NTQzNDE@._V1_SX300.jpg"
  //   }
  //   ],
  //   "totalResults": "7639",
  //   "Response": "True"
  //   }


  items = [
    { title: 'Item 1', img: '../../assets/1.png' },
    { title: 'Item 2', img: '../../assets/1.png' },
    { title: 'Item 3', img: '../../assets/1.png' },
    { title: 'Item 4', img: '../../assets/1.png' },
  ];
  error: string | undefined;

  constructor(private router: Router, private filmService: FilmService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.initialiserFilms("Inception", this.type);
  }


  Accueil() {
    this.router.navigate(["login"]);
  }


  initialiserFilms(value: string, type: string) {
    this.films$ = this.filmService.searchFilms(value, this.type); // Remplace `getFilms` par ta méthode appropriée
    this.films$.subscribe(data => {
      this.films = data; // Assigne les données des films à la propriété `films`
    });
  }

  handleInput(value: any) {
    debugger
    //this.films$ = this.filmService.searchFilms("Inception", "movie");
    value == "" ? this.initialiserFilms("Inception", this.type) : this.initialiserFilms(value, this.type);
  }


  searchChanged(event: any) {
    this.initialiserFilms("Inception", this.type);
  }

  async openFilmDetail(film: any) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: {
        film: film // Passe les détails du film à la modal
      }
    });
    return await modal.present();
  }

}
