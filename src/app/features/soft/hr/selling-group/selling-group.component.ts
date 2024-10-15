import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../../../shared/ui/header/header.component';
import {SidebarComponent} from '../../../../shared/ui/sidebar/sidebar.component';
import {WebContainerComponent} from '../../../../shared/ui/web-container/web-container.component';
import {
  WebContainerInnerComponent
} from '../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import {AddButtonComponent} from '../../../../shared/ui/add-button/add-button.component';
import {DropdownModule} from 'primeng/dropdown';
import {SellingGroupEmployeeComponent} from './selling-group-employee/selling-group-employee.component';
import {CrudService} from "../../../../shared/services/soft/crud.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, switchMap} from "rxjs";
import {CommonModule} from "@angular/common";
import {ISellingGroup, IWrapperGroup} from "./interfaces/selling-group.interface";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-selling-group',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    WebContainerComponent,
    WebContainerInnerComponent,
    AddButtonComponent,
    DropdownModule,
    SellingGroupEmployeeComponent,
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  templateUrl: './selling-group.component.html',
  styleUrl: './selling-group.component.scss',
})
export class SellingGroupComponent implements OnInit {
  private crudService = inject(CrudService)
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  filterForm!: FormGroup;
  rows: number = 4;
  $isItemSelected$ = signal(false)

  $page = new BehaviorSubject(1)
  $nameFilterProperty = new BehaviorSubject(undefined)
  $headEmployeeNameFilterProperty = new BehaviorSubject(undefined)

  sellingGroup$ = combineLatest([
    this.authService.getUser$(),
    this.$page,
    this.$nameFilterProperty,
    this.$headEmployeeNameFilterProperty
  ]).pipe(
    switchMap(([auth, page, name, headEmployeeName]) => {
      const filters = {
        name,
        headEmployeeName,
      }
      return this.crudService.filter$('selling-group', auth.buyerOrganziaitonId, page, filters).pipe(map((res: IWrapperGroup) => res))
    })
  )

  ngOnInit() {
    this.initFilterForm()

    this.filterForm.get('name')?.valueChanges.pipe(debounceTime(500),
      distinctUntilChanged()).subscribe(value => {
      this.$nameFilterProperty.next(value);
    });

    this.filterForm.get('headEmployeeName')?.valueChanges.pipe(debounceTime(500),
      distinctUntilChanged()).subscribe(value => {
      this.$headEmployeeNameFilterProperty.next(value);
    });
  }

  private initFilterForm() {
    this.filterForm = this.fb.group({
      name: [''],
      headEmployeeName: ['']
    });
  }

  listenPageChange(page: any) {
    this.$page.next(page.page);
  }

}
