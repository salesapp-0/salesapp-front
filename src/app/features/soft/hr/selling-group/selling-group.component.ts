import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-selling-group',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './selling-group.component.html',
  styleUrl: './selling-group.component.scss',
})
export class SellingGroupComponent {}
