import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup } from '@angular/forms';
import { FilmModel } from '../list/filmmodel';
import { ApiService } from '../shared/api.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'mm-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.scss']
})
export class AddmodalComponent implements OnInit{
  closeResult = '';
  formValue!:FormGroup;
  filmModelObj:FilmModel=new FilmModel();
  filmData !: any;
  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      filmname:[''],
      filmrelease:[''],
      filmdirector:[''],
      filmactors:['']
    })
    this.getAllFilms();
  }
  
  postFilmDetails(){
    if(this.formValue.value.filmname==="" ||
    this.formValue.value.filmrelease==="" ||
    this.formValue.value.filmdirector=="" ||
    this.formValue.value.filmactors===""){
      alert("Üres mezők!");
    }else{
      this.filmModelObj.name=this.formValue.value.filmname;
    this.filmModelObj.release=this.formValue.value.filmrelease;
    this.filmModelObj.director=this.formValue.value.filmdirector;
    this.filmModelObj.actors=this.formValue.value.filmactors;
    //this.
    //this.api.getFilm()
    this.api.postFilm(this.filmModelObj)
    .subscribe(res=>{
      console.log(res);
      //alert(this.formValue.value.filmname)
      //this.formValue.reset();
      this.getAllFilms()
      window.location.reload()
    })
    }
    
  }

  getAllFilms(){
    this.api.getFilm()
    .subscribe(res=>{
      this.filmData=res;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}