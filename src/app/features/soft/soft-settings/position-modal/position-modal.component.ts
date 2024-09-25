import { Component, EventEmitter, Output } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-position-modal',
  standalone: true,
  imports: [MultiSelectModule],
  templateUrl: './position-modal.component.html',
  styleUrl: './position-modal.component.scss',
})
export class PositionModalComponent {
  @Output() close = new EventEmitter();
  positionSelect!: { name: string }[];
}
