import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Output() emitActionType = new EventEmitter();
}
