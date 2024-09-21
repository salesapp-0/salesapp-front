import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { AddButtonComponent } from '../../../shared/ui/add-button/add-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { UniversalTableComponent } from '../../../shared/ui/universal-table/universal-table.component';
import { Observable, switchMap } from 'rxjs';
import { SoftParameterService } from '../../../shared/services/soft/soft-parameter.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ActionModalComponent } from './action-modal/action-modal.component';
import { CrudEnum } from '../../../core/enums/crud.enum';

@Component({
  selector: 'app-soft-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    AddButtonComponent,
    TabMenuModule,
    UniversalTableComponent,
    CommonModule,
    ActionModalComponent,
  ],
  templateUrl: './soft-settings.component.html',
  styleUrl: './soft-settings.component.scss',
})
export class SoftSettingsComponent {
  items: MenuItem[] | undefined;
  activeItem!: MenuItem;
  tableColumns = [
    {
      field: 'name',
      title: 'დასახელება',
      width: '25%',
    },
    {
      field: 'createdAt',
      title: 'შექმნის თარიღი',
      width: '25%',
    },
    {
      field: 'updatedAt',
      title: 'განახლების თარიღი',
      width: '25%',
    },
    {
      field: 'icons',
      title: '',
      width: '25%',
      icons: {
        edit: true,
        delete: true,
      },
    },
  ];
  crudEnum = CrudEnum;
  private authService = inject(AuthService);
  private softParameterService = inject(SoftParameterService);
  actions$: Observable<any> = this.authService.getUser$().pipe(
    switchMap((user) => {
      this.$buyerOrganziaitonId$.set(user.buyerOrganziaitonId);
      return this.softParameterService.getActions$(user.buyerOrganziaitonId, 1);
    })
  );
  $actionType$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  $buyerOrganziaitonId$ = signal('');
  $openActioPopup$ = signal(false);
  ngOnInit() {
    this.items = [
      { label: 'ქმედებები' },
      { label: 'პოზიციები' },
      { label: 'პროდუქტები' },
      { label: 'როლები და წვდომები' },
    ];
    this.activeItem = this.items[0];
  }

  handleEmitType(type: { type: string; actionId: string }) {
    this.$actionType$.set(type);
    if (type.type !== this.crudEnum.DELETE) this.$openActioPopup$.set(true);
  }
}
