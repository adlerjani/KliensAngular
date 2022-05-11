import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup } from '@angular/forms';
import { FilmModel } from '../list/filmmodel';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'mm-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.scss']
})
export class AddmodalComponent implements OnInit{
  closeResult = '';
  formValue!:FormGroup;
  filmModelObj:FilmModel=new FilmModel();
  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      filmname:[''],
      filmrelease:[''],
      filmdirector:[''],
      filmactors:['']
    })
  }

  postFilmDetails(){
    this.filmModelObj.name=this.formValue.value.filmname;
    this.filmModelObj.release=this.formValue.value.filmrelease;
    this.filmModelObj.director=this.formValue.value.filmdirector;
    this.filmModelObj.actors=this.formValue.value.filmactors;

    this.api.postFilm(this.filmModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("jó")
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