import { HrService } from './../../../../../shared/services/soft/hr.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { map, switchMap } from 'rxjs';
import { SoftParameterService } from '../../../../../shared/services/soft/soft-parameter.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log } from 'console';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  private hrService = inject(HrService);
  private fb = inject(FormBuilder);
  //
  @Output() close = new EventEmitter();
  @Input() position!: any;
  roles$ = this.hrService.getRoles$().pipe(
    map((res) => {
      return res.map((role: any) => {
        return { name: role.name, id: role.id };
      });
    })
  );

  addProductForm: FormGroup;

  constructor() {
    this.addProductForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      personalNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      role: ['', Validators.required],
      salesGroup: [''],
    });
  }
  onSubmit() {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.getRawValue();
      const formatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: String(formData.phoneNumber),
        personalNumber: String(formData.personalNumber),
        email: formData.email,
        positionId: formData.position.id,
        roleIds: [formData.role.id],
        salesGroupId: formData.salesGroup?.id || null,
        isActive: true,
      };
      this.hrService
        .addEmployee$(formatedData)
        .pipe(
          map((res) => {
            this.close.emit();
          })
        )
        .subscribe();
    }
  }
}
