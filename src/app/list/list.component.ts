import { Component, OnInit } from '@angular/core';
import { FilmModel } from './filmmodel';

interface Film {
  name: string;
  release: string;
  director: string;
  actors: string;
}

const FilmList: Film[] = [
  {
    name: 'A keresztapa',
    release: '1972',
    director: 'Francis Ford Coppola',
    actors: 'Al Pacino, Diane Keaton, Marlon Brando, Robert Duvall, James Caan, Talia Shire, John Cazale, Sofia Coppola'
  },
  {
    name: 'A keresztapa 2',
    release: '1972',
    director: 'Francis Ford Coppola',
    actors: 'Al Pacino, Diane Keaton, Marlon Brando, Robert Duvall, James Caan, Talia Shire, John Cazale, Sofia Coppola'
  },
  
];

@Component({
  selector: 'mm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
   filmModelObj:FilmModel=new FilmModel();
   constructor() { }

  ngOnInit(): void {
  } 

  films = FilmList;

}
