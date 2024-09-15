import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-email',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-email.component.html',
  styleUrl: './add-email.component.scss',
})
export class AddEmailComponent {
  @Output() thowEmails = new EventEmitter();
  @Output() close = new EventEmitter();
  private fb = inject(FormBuilder);
  emailForm!: FormGroup;
  constructor() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (!this.emailForm.invalid) {
      this.thowEmails.emit(this.emailForm.value.email);
      this.close.emit();
      this.emailForm.reset();
    }
  }
}
