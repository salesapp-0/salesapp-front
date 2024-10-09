import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';
import { WebContainerInnerComponent } from '../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import { DropdownModule } from 'primeng/dropdown';
import {
  BehaviorSubject,
  debounceTime,
  map,
  Observable,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalTableComponent } from '../../../../shared/ui/universal-table/universal-table.component';
import { employeeColumns } from './entity/employee.entity';
import { HrService } from '../../../../shared/services/soft/hr.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { IEmployee } from './entity/interfaces/employee.interface';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { CrudEnum } from '../../../../core/enums/crud.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { unsub } from '../../../../shared/classes/unsub.class';
import { NavigateService } from '../../../../shared/services/navigate.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    WebContainerComponent,
    WebContainerInnerComponent,
    DropdownModule,
    CommonModule,
    TranslateModule,
    UniversalTableComponent,
    AddEmployeeComponent,
    ReactiveFormsModule,
    CheckboxModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent extends unsub {
  public translationSubscription$!: Observable<any>;
  $isItemSelected$ = signal(false);
  $page = new BehaviorSubject<number>(1);
  tableColumnsRoles = employeeColumns;
  private hrService = inject(HrService);
  private authService = inject(AuthService);
  private softParameterService = inject(SoftParameterService);
  private navigateService = inject(NavigateService);
  employeeData$ = this.authService.getUser$().pipe(
    switchMap((res) => {
      return this.$page.pipe(
        debounceTime(500),
        switchMap((page) => {
          return this.hrService
            .filterOrg$(
              'employee',
              res.buyerOrganziaitonId,
              page,
              this.employeeFilterForm.value.sellingGroupName,
              this.employeeFilterForm.value.search,
              this.employeeFilterForm.value.position
            )
            .pipe(
              map((res: IEmployee) => {
                return {
                  data: res.data.map((res) => {
                    res.createdAt = res.createdAt.split('T')[0];
                    res.updatedAt = res.updatedAt.split('T')[0];
                    return {
                      ...res,
                      position: res?.position?.name || '',
                      role: res?.user?.roles?.map((res) => res?.role?.name),
                    };
                  }),
                  total: res.total,
                  page: res.page,
                  limit: res.limit,
                  totalPages: res.totalPages,
                };
              })
            );
        })
      );
    })
  );
  positions$ = this.authService.getUser$().pipe(
    switchMap((res) => {
      return this.softParameterService
        .getPositions$(res.buyerOrganziaitonId, 1, 100)
        .pipe(
          map((res) => {
            return res.data.map((position: any) => {
              return { name: position.name, id: position.id };
            });
          })
        );
    })
  );
  crudEnum = CrudEnum;
  $openAddPopup$ = signal(false);
  $actionType$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  employeeFilterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.employeeFilterForm = this.fb.group({
      search: [''],
      position: [null],
      sellingGroupName: [null],
    });
    this.employeeFilterForm.valueChanges.subscribe((res) => {
      this.$page.next(1);
    });

    this.employeeFilterForm
      .get('position')
      ?.valueChanges.pipe(
        map((value) => {
          this.$isItemSelected$.set(value != null);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  handleEmitType(type: { type: string; actionId: string; tabType: string }) {
    this.$actionType$.set(type);
    if (type.type === this.crudEnum.READ) {
      this.handleSpecificOrganizationClick('view-employee', type.actionId);
    } else {
      this.$openAddPopup$.set(true);
    }
  }

  handleSpecificOrganizationClick(route: string, employeeId: string) {
    this.navigateService.navigateTo(`${route}/view`, { employeeId });
  }
}
