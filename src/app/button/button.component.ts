import { Component, Input, OnInit } from '@angular/core';
import { ButtonColor } from '../models/ButtonColor';

@Component({
  selector: 'mm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  color?: ButtonColor; 

  get colorChar() {
    return (this.color ?? "X")[0].toUpperCase();
  }

  get colorLower() {
    return this.color ?? "unset"; 
  }

  share() {
    window.alert('The product has been shared!');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
