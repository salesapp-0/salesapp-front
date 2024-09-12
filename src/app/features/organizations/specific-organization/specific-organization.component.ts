import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-specific-organization',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, TabMenuModule, DetailsComponent],
  templateUrl: './specific-organization.component.html',
  styleUrl: './specific-organization.component.scss',
})
export class SpecificOrganizationComponent {
  items: MenuItem[] | undefined;
  activeItem!: MenuItem;
  ngOnInit() {
    this.items = [
      { label: 'დეტალები' },
      { label: 'ინვოისი' },
      { label: 'დოკუმენტაცია' },
    ];
    this.activeItem = this.items[0];
  }
}
