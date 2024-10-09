import { Component, inject, signal } from '@angular/core';
import { WebContainerComponent } from '../../../../../shared/ui/web-container/web-container.component';
import { WebContainerInnerComponent } from '../../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import { NavigateService } from '../../../../../shared/services/navigate.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, takeUntil, tap } from 'rxjs';
import { HrService } from '../../../../../shared/services/soft/hr.service';
import { CommonModule } from '@angular/common';
import { Data, IEmployee } from '../entity/interfaces/employee.interface';
import { unsub } from '../../../../../shared/classes/unsub.class';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    WebContainerComponent,
    WebContainerInnerComponent,
    InputSwitchModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent extends unsub {
  checked: boolean = false;
  private routeSub!: Subscription;
  private $employeeId$ = signal('');
  public employee$!: Observable<any>;
  private navigateService = inject(NavigateService);
  private route = inject(ActivatedRoute);
  private hrService = inject(HrService);
  navigateBack(route: string) {
    this.navigateService.navigateTo(route);
  }
  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      const employeeId = params['employeeId'];
      if (employeeId) {
        this.$employeeId$.set(employeeId);
        this.getSpecificEmployee(employeeId);
      }
    });
  }
  getSpecificEmployee(id: string) {
    this.employee$ = this.hrService.getSpecificEmployee$(id).pipe(
      map((res: Data[]) => {
        this.checked = res[0].isActive;
        return {
          ...res[0],
          role: res[0]?.user?.roles?.map((res: any) => res?.role?.name),
          position: res[0]?.position?.name || '',
        };
      }),
      tap(console.log)
    );
  }
  deactivateEmployee() {
    if (this.$employeeId$()) {
      this.hrService
        .deactivateEmployee$(this.$employeeId$(), this.checked)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }
  override ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
