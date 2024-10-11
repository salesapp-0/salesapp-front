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
import {map, Observable, switchMap, takeUntil} from 'rxjs';
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
import {IPosition} from "../entity/interfaces/employee.interface";
import {Roles} from "../entity/interfaces/roles.interface";

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
  @Input() position!: {name:string,id:string}[];
  roles$:Observable<{name:string,id:string}[] | any> = this.hrService.getRoles$().pipe(
    map((res:Roles[]) => {
      return res.map((role) => {
        return { name: role.name, id: role.id };
      });
    })
  );
  @Input() set actionType(val: { type: string; actionId: string }) {
    this.$actionTypeStr$.set(val);

    if (val.type === CrudEnum.UPDATE) {
      this.loadEmployeeData(val.actionId)
    }
  }
  employeeForm!: FormGroup;
  public $actionTypeStr$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });

  constructor() {
    super();
    this.initForm()
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = this.formatFormData()
      const actionType = this.$actionTypeStr$().type
      if (actionType === CrudEnum.ADD) {
        this.hrService.addEmployee$(formData)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.close.emit());
      } else {
        const actionId = this.$actionTypeStr$().actionId;
        this.hrService.updateEmployee$(formData, actionId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.close.emit());
      }
    }
  }
  private loadEmployeeData(actionId: string) {
    this.softParameterService
      .getSpecificItem$(actionId, 'employee')
      .pipe(
        map((item) => item[0]),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res) => this.patchFormValues(res));
  }

  private formatFormData() {
    const formData = this.employeeForm.getRawValue();
    return {
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
  }

  private patchFormValues(res: any) {
    const roleNames = res.user.roles.map((role: any) => ({
      name: role.role.name,
      id: role.role.id,
    }));

    this.employeeForm.patchValue({
      firstName: res.firstName,
      lastName: res.lastName,
      phoneNumber: res.phoneNumber,
      personalNumber: res.personalNumber,
      email: res.email,
      position: {
        id: res?.position?.id || '',
        name: res?.position?.name || '',
      },
      role: {
        id: roleNames[0].id,
        name: roleNames[0].name,
      },
      salesGroup: res.salesGroup
        ? { id: res.salesGroup.id, name: res.salesGroup.name }
        : '',
    });
  }

  private initForm() {
    this.employeeForm = this.fb.group({
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
  private resetValues() {
    this.employeeForm.reset();
    this.$actionTypeStr$.set({
      type: '',
      actionId: '',
    });
  }
  override ngOnDestroy(): void {
    this.resetValues()
  }
}
