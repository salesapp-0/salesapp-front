import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { AddButtonComponent } from '../../../shared/ui/add-button/add-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { UniversalTableComponent } from '../../../shared/ui/universal-table/universal-table.component';

@Component({
  selector: 'app-soft-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    AddButtonComponent,
    TabMenuModule,
    UniversalTableComponent,
  ],
  templateUrl: './soft-settings.component.html',
  styleUrl: './soft-settings.component.scss',
})
export class SoftSettingsComponent {
  items: MenuItem[] | undefined;
  activeItem!: MenuItem;
  tableHeaderTexts = [
    {
      title: 'დასახელება',
      hasIcon: false,
    },
    {
      title: 'შექმნის თარიღი',
      hasIcon: false,
    },
    {
      title: 'განახლების თარიღი',
      hasIcon: false,
    },
    {
      title: '',
      hasIcon: false,
    },
  ];
  ngOnInit() {
    this.items = [
      { label: 'ქმედებები' },
      { label: 'პოზიციები' },
      { label: 'პროდუქტები' },
      { label: 'როლები და წვდომები' },
    ];
    this.activeItem = this.items[0];
  }
}
