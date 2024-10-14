import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';
import { WebContainerInnerComponent } from '../../../../shared/ui/web-container/web-container-inner/web-container-inner.component';
import { AddButtonComponent } from '../../../../shared/ui/add-button/add-button.component';
import { DropdownModule } from 'primeng/dropdown';
import { SellingGroupEmployeeComponent } from './selling-group-employee/selling-group-employee.component';

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
  ],
  templateUrl: './selling-group.component.html',
  styleUrl: './selling-group.component.scss',
})
export class SellingGroupComponent {
  $isItemSelected$ = signal(false);
}
