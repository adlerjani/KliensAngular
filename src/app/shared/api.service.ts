import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postFilm(data: any){
    return this.http.post<any>("http://localhost:3004/posts/", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getFilm(){
    return this.http.get<any>("http://localhost:3004/posts/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}