import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'mm-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.scss']
})
export class AddmodalComponent implements OnInit{
  closeResult = '';
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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