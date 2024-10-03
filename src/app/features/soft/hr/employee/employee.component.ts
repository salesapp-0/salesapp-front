import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, WebContainerComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {}
