import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from "../../shared/ui/header/header.component";
import {SidebarComponent} from "../../shared/ui/sidebar/sidebar.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
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
  tap
} from "rxjs";
import {ApiService} from "../../shared/services/api-service.service";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {unsub} from "../../shared/classes/unsub.class";
import {LastContactStatus} from "../../core/enums/contact-status.enum";
import {BuyerOrganization, BuyerOrganizations} from "../../core/interfaces/buyer-organizations.interface";
import {NavigateService} from "../../shared/services/navigate.service";
import {OrganizationsService} from "../../shared/services/organizations.service";

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
    ReactiveFormsModule
  ],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent extends unsub implements OnInit{
  value: string = '';
  date: Date | undefined;
  statusOptions: any[] = [];
  organizations$!: Observable<BuyerOrganizations>;
  myForm!: FormGroup;
  $page$ = signal(1);
  $limit$ = signal(10);
  $totalRecords$ = signal(0);
  private organizationService = inject(OrganizationsService);
  private fb = inject(FormBuilder)
  private navigateService = inject(NavigateService)
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
      date: ['']
    });
    this.myForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((res) => {
        this.loadOrganizations()
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
    this.loadOrganizations();
  }


  loadOrganizations(): void {
    const dateValue = this.myForm.get('date')?.value;
    let formatDate
    if(dateValue) {
      let date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date value');
      }
     formatDate = date.toISOString();
    }
    const filters = {
      search: this.myForm.get('search')?.value,
      dateRange: this.myForm.get('date')?.value ? [formatDate, formatDate] : undefined,
      status: this.myForm.get('status')?.value?.code
    };
    this.organizations$ = this.organizationService.getOrganizations(this.currentPage, this.rowsPerPage, filters).pipe(
      map((res:BuyerOrganizations) => {
        return {
          data:this.handleChangeData(res.data),
          total: res.total
        }
      }),
      tap(response => {
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
  handleChangeData(data:BuyerOrganization[]) {
    let obj:any = {
      active: 'აქტიური',
      passive: 'პასიური',
      registered: 'დარეგისტრირებული',
      overdue: 'ვადაგადაცილებული',
    }
    return data.map((data:BuyerOrganization) => {
      return {
        ...data,
        status:obj[data.status]
      }
    })
  }

  handleNavigate(route:string) {
    this.navigateService.navigateTo(route)
  }
  handleEditClick(route:string,organizationId:string) {
    console.log(organizationId,"123")
    this.navigateService.navigateTo(`${route}/edit`,{id:organizationId})
  }
}
