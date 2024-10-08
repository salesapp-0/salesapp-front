import { HrService } from './../../../../../shared/services/soft/hr.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { map, switchMap, takeUntil } from 'rxjs';
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
import { CrudEnum } from '../../../../../core/enums/crud.enum';
import { unsub } from '../../../../../shared/classes/unsub.class';

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
export class AddEmployeeComponent extends unsub implements OnDestroy {
  private hrService = inject(HrService);
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
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
  @Input() set actionType(val: { type: string; actionId: string }) {
    this.$actionTypeStr$.set(val);

    if (val.type === CrudEnum.UPDATE) {
      this.softParameterService
        .getSpecificItem$(val.actionId, 'employee')
        .pipe(
          map((item) => item[0]),
          map((res: any) => {
            this.addProductForm.get('firstName')?.patchValue(res.firstName);
            this.addProductForm.get('lastName')?.patchValue(res.lastName);
            this.addProductForm.get('phoneNumber')?.patchValue(res.phoneNumber);
            this.addProductForm
              .get('personalNumber')
              ?.patchValue(res.personalNumber);
            this.addProductForm.get('email')?.patchValue(res.email);
            const roleNames = res.user.roles.map((role: any) => {
              return { name: role.role.name, id: role.role.id };
            });
            this.addProductForm.get('position')?.patchValue({
              id: res?.position?.id || '',
              name: res?.position?.name || '',
            });
            this.addProductForm.get('role')?.patchValue({
              id: roleNames[0].id,
              name: roleNames[0].name,
            });
            if (res.salesGroup) {
              this.addProductForm.get('salesGroup')?.patchValue({
                id: res.salesGroup.id,
                name: res.salesGroup.name,
              });
            }
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  addProductForm: FormGroup;
  public $actionTypeStr$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  constructor() {
    super();
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
  override ngOnDestroy(): void {
    this.addProductForm.reset();
    this.$actionTypeStr$.set({
      type: '',
      actionId: '',
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
      if (this.$actionTypeStr$().type === CrudEnum.ADD) {
        this.hrService
          .addEmployee$(formatedData)
          .pipe(
            map((res) => {
              this.close.emit();
            })
          )
          .subscribe();
      } else {
        this.hrService
          .updateEmployee$(formatedData, this.$actionTypeStr$().actionId)
          .pipe(
            map((res) => {
              this.close.emit();
            })
          )
          .subscribe();
      }
    }
  }
}
