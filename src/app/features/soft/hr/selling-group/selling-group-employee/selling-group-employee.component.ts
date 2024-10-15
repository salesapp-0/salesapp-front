import {Component, inject, Input, OnInit} from '@angular/core';
import {ISellingGroup} from "../interfaces/selling-group.interface";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-selling-group-employee',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './selling-group-employee.component.html',
  styleUrl: './selling-group-employee.component.scss',
})
export class SellingGroupEmployeeComponent  {
  @Input() isYourGroup = false;
  @Input() sellingGroupData!:ISellingGroup


}
