import { join } from 'node:path';
import { tableColumnsPosition } from './entity/positions.entity';
import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { AddButtonComponent } from '../../../shared/ui/add-button/add-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { UniversalTableComponent } from '../../../shared/ui/universal-table/universal-table.component';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { SoftParameterService } from '../../../shared/services/soft/soft-parameter.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ActionModalComponent } from './action-modal/action-modal.component';
import { CrudEnum } from '../../../core/enums/crud.enum';
import { tableColumns } from './entity/actions.entity';
import { Action, IActions } from '../../../core/interfaces/actions.interface';
import { IPosition } from '../../../core/interfaces/positions.interface';
import { TabType } from '../../../core/enums/tab-type.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LanguegeServices } from '../../../shared/services/translate.service';
import { PositionModalComponent } from './position-modal/position-modal.component';
import { productsColumnsPosition } from './entity/products.entity';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { roleColumnsPosition } from './entity/role-premissions.entity';
import { RolePermissions } from '../../../core/interfaces/roles.interfcae';

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
    TranslateModule,
    PositionModalComponent,
    ProductModalComponent,
  ],
  templateUrl: './soft-settings.component.html',
  styleUrl: './soft-settings.component.scss',
})
export class SoftSettingsComponent {
  private authService = inject(AuthService);
  private softParameterService = inject(SoftParameterService);
  private langService = inject(LanguegeServices);
  //
  items: MenuItem[] | undefined;
  activeItem!: any;
  tableColumns = tableColumns;
  tableColumnsPosition = tableColumnsPosition;
  tableColumnsProducts = productsColumnsPosition;
  tableColumnsRoles = roleColumnsPosition;
  crudEnum = CrudEnum;
  tabType = TabType;
  public page$ = new BehaviorSubject(1);
  actions$: Observable<IActions<Action>> = this.authService.getUser$().pipe(
    switchMap((user) => {
      this.$buyerOrganziaitonId$.set(user.buyerOrganziaitonId);
      return this.page$.pipe(
        switchMap((page) => {
          return this.softParameterService
            .getActions$(user.buyerOrganziaitonId, page)
            .pipe(
              map((res) => {
                return {
                  ...res,
                  data: res.data.map((res: Action) => {
                    res.createdAt = res.createdAt.split('T')[0];
                    res.updatedAt = res.updatedAt.split('T')[0];
                    return res;
                  }),
                };
              })
            );
        })
      );
    })
  );
  positions$: Observable<IActions<IPosition>> = this.authService
    .getUser$()
    .pipe(
      switchMap((user) => {
        return this.page$.pipe(
          switchMap((page) => {
            return this.softParameterService
              .getPositions$(user.buyerOrganziaitonId, page)
              .pipe(
                map((res) => {
                  return {
                    ...res,
                    data: res.data.map((res: Action) => {
                      res.createdAt = res.createdAt.split('T')[0];
                      res.updatedAt = res.updatedAt.split('T')[0];
                      return res;
                    }),
                  };
                })
              );
          })
        );
      })
    );

  products$: Observable<IActions<IPosition>> = this.authService.getUser$().pipe(
    switchMap((user) => {
      return this.page$.pipe(
        switchMap((page) => {
          return this.softParameterService
            .getProducts$(user.buyerOrganziaitonId, page, 'products')
            .pipe(
              map((res) => {
                return {
                  ...res,
                  data: res.data.map((res: Action) => {
                    res.createdAt = res.createdAt.split('T')[0];
                    res.updatedAt = res.updatedAt.split('T')[0];
                    return res;
                  }),
                };
              })
            );
        })
      );
    })
  );

  role$: Observable<IActions<RolePermissions[]>> = this.authService
    .getUser$()
    .pipe(
      switchMap((user) => {
        return this.page$.pipe(
          switchMap((page) => {
            return this.softParameterService
              .getProducts$(user.buyerOrganziaitonId, page, 'roles')
              .pipe(
                map((res) => {
                  const permissions = res.data.map((res: RolePermissions) => {
                    return res.rolePermissions.map((permission) => {
                      return permission.permission.value;
                    });
                  });
                  return {
                    ...res,
                    data: res.data.map((res: RolePermissions) => {
                      res.createdAt = res.createdAt.split('T')[0];
                      res.updatedAt = res.updatedAt.split('T')[0];
                      res.rolePermissions = permissions[0];
                      return res;
                    }),
                  };
                })
              );
          })
        );
      })
    );

  tabOptions$!: Observable<any>;
  $actionType$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  $buyerOrganziaitonId$ = signal('');
  $openActioPopup$ = signal(false);
  $openPositionModal$ = signal(false);
  $openProductsModal$ = signal(false);
  ngOnInit() {
    this.items = [
      { label: 'actions' },
      { label: 'positions' },
      { label: 'products' },
      { label: 'roles-premisions' },
    ];
    this.onLangChangeStatus();
    this.activeItem = this.items[0];
  }

  handleEmitType(type: { type: string; actionId: string; tabType: string }) {
    this.$actionType$.set(type);
    if (
      (type.tabType === this.tabType.ACTIONS ||
        type.type !== this.crudEnum.DELETE) &&
      type.tabType !== TabType.POSITIONS &&
      type.tabType !== TabType.PRODUCTS
    ) {
      this.$openActioPopup$.set(true);
    }
    if (type.tabType === TabType.POSITIONS) {
      this.$openPositionModal$.set(true);
    }
    if (type.tabType === TabType.PRODUCTS) {
      this.$openProductsModal$.set(true);
    }
  }
  listenPageChange(page: { page: number; limit: number }) {
    this.page$.next(page.page);
  }
  onLangChangeStatus() {
    this.tabOptions$ = this.langService
      .translateOptions(
        this.items as any,
        ['actions', 'positions', 'products', 'roles-premisions'],
        'label'
      )
      .pipe(
        map((res) => {
          this.activeItem = res[0];
          return res;
        })
      );
  }
  onTabChange(event: any) {
    this.page$.next(1);
  }
}
