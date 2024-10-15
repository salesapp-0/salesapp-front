import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-add-selling-group',
  standalone: true,
  imports: [
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: './add-selling-group.component.html',
  styleUrl: './add-selling-group.component.scss'
})
export class AddSellingGroupComponent {
  @Output() close = new EventEmitter();
}
