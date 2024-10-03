import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../../shared/ui/sidebar/sidebar.component';
import { WebContainerComponent } from '../../../../shared/ui/web-container/web-container.component';

@Component({
  selector: 'app-selling-group',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, WebContainerComponent],
  templateUrl: './selling-group.component.html',
  styleUrl: './selling-group.component.scss',
})
export class SellingGroupComponent {}
