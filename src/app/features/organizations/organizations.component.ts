import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { SidebarComponent } from '../../shared/ui/sidebar/sidebar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ApiService } from '../../shared/services/api-service.service';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { unsub } from '../../shared/classes/unsub.class';
import { LastContactStatus } from '../../core/enums/contact-status.enum';
import {
  BuyerOrganization,
  BuyerOrganizations,
} from '../../core/interfaces/buyer-organizations.interface';
import { NavigateService } from '../../shared/services/navigate.service';
import { OrganizationsService } from '../../shared/services/organizations.service';
import { AddOrganizationComponent } from './add-organization/add-organization.component';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    CommonModule,
    PaginatorModule,
    ReactiveFormsModule,
    AddOrganizationComponent,
  ],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent extends unsub implements OnInit {
  value: string = '';
  date: Date | undefined;
  statusOptions: any[] = [];
  organizations$!: Observable<BuyerOrganizations>;
  myForm!: FormGroup;
  $page$ = signal(1);
  $limit$ = signal(10);
  $totalRecords$ = signal(0);
  $isModalOpen$ = signal(false);
  $organizationId$: WritableSignal<string | null> = signal(null);
  private organizationService = inject(OrganizationsService);
  private fb = inject(FormBuilder);
  private navigateService = inject(NavigateService);
  ngOnInit() {
    this.statusOptions = [
      { name: 'აქტიური', code: 'active' },
      { name: 'არაქტიური', code: 'passive' },
      { name: 'დარეგისტრირებული', code: 'registered' },
      { name: 'ვადაგადაცილებული', code: 'overdue' },
    ];
    this.myForm = this.fb.group({
      search: [''],
      status: [''],
      date: [''],
    });
    this.myForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((res) => {
          this.loadOrganizations();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    const dateValue = this.myForm.get('date')?.value;
    let formattedStartDate: string | undefined;
    let formattedEndDate: string | undefined;

    if (dateValue && dateValue.length === 2) {
      const startDate = new Date(dateValue[0]);
      const endDate = new Date(dateValue[1]);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date range values');
      }
      formattedStartDate = startDate.toISOString();
      formattedEndDate = endDate.toISOString();
    }
    const filters = {
      search: this.myForm.get('search')?.value,
      dateRange:
        formattedStartDate && formattedEndDate
          ? [formattedStartDate, formattedEndDate]
          : undefined,
      status: this.myForm.get('status')?.value?.code,
    };
    this.organizations$ = this.organizationService
      .getOrganizations(this.currentPage, this.rowsPerPage, filters)
      .pipe(
        map((res: BuyerOrganizations) => {
          return {
            data: this.handleChangeData(res.data),
            total: res.total,
          };
        }),
        tap((response) => {
          this.$totalRecords$.set(response.total);
        })
      );
  }
  onPageChange(event: any): void {
    this.$page$.set(event.page + 1);
    this.$limit$.set(event.rows);
    this.loadOrganizations();
  }

  get currentPage(): number {
    return this.$page$();
  }
  get rowsPerPage(): number {
    return this.$limit$();
  }
  get first(): number {
    return (this.currentPage - 1) * this.rowsPerPage;
  }
  handleChangeData(data: BuyerOrganization[]) {
    let statusColors: any = {
      active: {
        name: 'აქტიური',
        textColor: 'text-success',
        bgColor: 'bg-backgroundDark',
      },
      passive: {
        name: 'პასიური',
        textColor: 'text-alert',
        bgColor: 'bg-textMedium',
      },
      registered: {
        name: 'დარეგისტრირებული',
        textColor: 'text-white',
        bgColor: 'bg-yellow-500',
      },
      overdue: {
        name: 'ვადაგადაცილებული',
        textColor: 'text-error',
        bgColor: 'bg-textLight',
      },
    };
    return data.map((data: BuyerOrganization) => {
      return {
        ...data,
        status: statusColors[data.status],
      };
    });
  }

  handleNavigate(route: string) {
    this.navigateService.navigateTo(route);
  }
  handleEditClick(organizationId: string) {
    this.$isModalOpen$.set(true);
    this.$organizationId$.set(organizationId);
  }

  handleSpecificOrganizationClick(route: string, organizationId: string) {
    this.navigateService.navigateTo(`${route}/see`, { id: organizationId });
  }
}
