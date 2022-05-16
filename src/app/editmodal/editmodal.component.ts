import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup } from '@angular/forms';
import { FilmModel } from '../list/filmmodel';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'mm-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent implements OnInit {

  @Input()
  row: any;

  closeResult = '';
  formValue!:FormGroup;
  filmModelObj:FilmModel=new FilmModel();
  filmData !: any;
  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      filmname:[''],
      filmrelease:[''],
      filmdirector:[''],
      filmactors:['']
    })
    this.getAllFilms();
  }

  getAllFilms(){
    this.api.getFilm()
    .subscribe(res=>{
      this.filmData=res;
    })
  }

  onEdit(row:any){
    this.filmModelObj.id=row.id;
    this.formValue.controls['filmname'].setValue(row.name);
    this.formValue.controls['filmrelease'].setValue(row.release);
    this.formValue.controls['filmdirector'].setValue(row.director);
    this.formValue.controls['filmactors'].setValue(row.actors);
  }


  updateFilms(){
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
    this.api.updateFilm(this.filmModelObj,this.filmModelObj.id)
    .subscribe(res=>{
      console.log(res);
      //alert(this.formValue.value.filmname)
      //this.formValue.reset();
      this.getAllFilms()
      window.location.reload()
    })
    }
  }

  open(content: any) {
    this.onEdit(this.row);
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
