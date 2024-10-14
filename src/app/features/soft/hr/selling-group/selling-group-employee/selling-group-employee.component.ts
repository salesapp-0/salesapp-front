import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selling-group-employee',
  standalone: true,
  imports: [],
  templateUrl: './selling-group-employee.component.html',
  styleUrl: './selling-group-employee.component.scss',
})
export class SellingGroupEmployeeComponent {
  @Input() isYourGroup = false;
}
