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
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  takeUntil,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { unsub } from '../../shared/classes/unsub.class';
import {
  BuyerOrganization,
  BuyerOrganizations,
  Status,
} from '../../core/interfaces/buyer-organizations.interface';
import { NavigateService } from '../../shared/services/navigate.service';
import { OrganizationsService } from '../../shared/services/organizations.service';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguegeServices } from '../../shared/services/translate.service';
import { AddButtonComponent } from '../../shared/ui/add-button/add-button.component';

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
    TranslateModule,
    AddButtonComponent,
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
  $limit$ = signal(8);
  $totalRecords$ = signal(0);
  $isModalOpen$ = signal(false);
  isItemSelected = false;
  $organizationId$: WritableSignal<string | null> = signal(null);
  public translationSubscription$!: Observable<any>;
  private organizationService = inject(OrganizationsService);
  private fb = inject(FormBuilder);
  private navigateService = inject(NavigateService);
  private langService = inject(LanguegeServices);
  ngOnInit() {
    this.statusOptions = [
      { name: 'drop-down-status.1', code: 'active' },
      { name: 'drop-down-status.2', code: 'passive' },
      { name: 'drop-down-status.3', code: 'registered' },
      { name: 'drop-down-status.4', code: 'overdue' },
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
    this.onLangChangeStatus();
    this.myForm
      .get('status')
      ?.valueChanges.pipe(
        map((value) => {
          this.isItemSelected = value != null;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
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
      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

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
    let statusColors: {
      [key: string]: Status;
    } = {
      active: {
        name: 'drop-down-status.1',
        textColor: 'text-success',
        bgColor: 'bg-backgroundDark',
      },
      passive: {
        name: 'drop-down-status.2',
        textColor: 'text-alert',
        bgColor: 'bg-textMedium',
      },
      registered: {
        name: 'drop-down-status.3',
        textColor: 'text-white',
        bgColor: 'bg-yellow-500',
      },
      overdue: {
        name: 'drop-down-status.4',
        textColor: 'text-error',
        bgColor: 'bg-textLight',
      },
    };
    return data.map((data: BuyerOrganization) => {
      return {
        ...data,
        statusColor: statusColors[data.status],
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
  onLangChangeStatus() {
    this.translationSubscription$ = this.langService
      .translateOptions(this.statusOptions, [
        'drop-down-status.1',
        'drop-down-status.2',
        'drop-down-status.3',
        'drop-down-status.4',
      ])
      .pipe(map((res) => res));
  }
}
