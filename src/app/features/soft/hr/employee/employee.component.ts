import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';
import { WebContainerInnerComponent } from '../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import { DropdownModule } from 'primeng/dropdown';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalTableComponent } from '../../../../shared/ui/universal-table/universal-table.component';
import { employeeColumns } from './entity/employee.entity';
import { HrService } from '../../../../shared/services/soft/hr.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../core/interfaces/user.interface';
import { IEmployee } from './entity/interfaces/employee.interface';
import { log } from 'console';

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
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  public translationSubscription$!: Observable<any>;
  $isItemSelected$ = signal(false);
  $page = new BehaviorSubject<number>(1);
  tableColumnsRoles = employeeColumns;
  private hrService = inject(HrService);
  private authService = inject(AuthService);
  employeeData$: Observable<any> = this.authService.getUser$().pipe(
    switchMap((res) => {
      return this.$page.pipe(
        switchMap((page) => {
          return this.hrService
            .filterOrg$('employee', res.buyerOrganziaitonId, page)
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
}
