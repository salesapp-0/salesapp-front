import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { map } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-role-premission-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    FloatLabelModule,
    MultiSelectModule,
  ],
  templateUrl: './role-premission-modal.component.html',
  styleUrl: './role-premission-modal.component.scss',
})
export class RolePremissionModalComponent implements OnInit {
  productForm!: FormGroup;
  @Output() close = new EventEmitter();
  group: any | undefined;
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      cost: [null, [Validators.required]],
      premissions: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.softParameterService
      .getPermissions$()
      .pipe(
        map((res) => {
          this.group = res.map((permissions: any) => {
            return { name: permissions.nameKa };
          });
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.productForm.valid) {
    }
  }
}
