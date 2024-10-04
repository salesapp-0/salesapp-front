import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';
import { WebContainerInnerComponent } from '../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalTableComponent } from '../../../../shared/ui/universal-table/universal-table.component';
import { employeeColumns } from './entity/employee.entity';

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
  tableColumnsRoles = employeeColumns;
}
