import {
  Component,
  inject,
  NO_ERRORS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { unsub } from '../../classes/unsub.class';
import { AuthService } from '../../services/auth.service';
import { NavigateService } from '../../services/navigate.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { PermissionsEnum } from '../../../core/enums/premissions.enum';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    FormsModule,
    CommonModule,
    SvgIconComponent,
    TranslateModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class SidebarComponent extends unsub implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private navigateService = inject(NavigateService);
  $mode$ = signal('light');
  $currentRoute$ = signal('');
  $isSIdeBarOpen$ = signal(true);
  permissionsEnum = PermissionsEnum;
  routes = [
    {
      path: '/main-page',
      permission: this.permissionsEnum.READ_MAIN_PAGE,
      icon: './assets/images/side-bar/house-inactive.png',
      activeIcon: './assets/images/side-bar/home-active.png',
      label: 'side-bar.1',
    },
    {
      path: '/organizations',
      permission: this.permissionsEnum.READ_ORGANIZATION,
      icon: './assets/images/side-bar/house.png',
      activeIcon: './assets/images/side-bar/house-white.png',
      label: 'side-bar.2',
    },
    {
      path: '/invoices',
      permission: this.permissionsEnum.READ_INVOICE,
      icon: './assets/images/side-bar/Vector.png',
      label: 'side-bar.3',
    },
    {
      path: '/admin-settings',
      permission: this.permissionsEnum.READ_ADMIN_SETTINGS,
      icon: './assets/images/side-bar/ic24-settings.png',
      activeIcon: './assets/images/side-bar/setting-icon.png',
      label: 'side-bar.4',
    },
    {
      path: '/soft-settings',
      permission: this.permissionsEnum.READ_SOFT_SETTINGS,
      icon: './assets/images/side-bar/ic24-settings.png',
      activeIcon: './assets/images/side-bar/setting-icon.png',
      label: 'side-bar.4',
    },
  ];
  constructor() {
    super();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event: any) => {
        this.$currentRoute$.set(event.url);
      });
  }
  ngOnInit(): void {
    const savedState = localStorage.getItem('isSidebarOpen');

    if (savedState !== null) {
      this.$isSIdeBarOpen$.set(JSON.parse(savedState));
    }
  }
  handleSelectMode(mode: string) {
    this.$mode$.set(mode);
  }
  onNavigate(url: string) {
    this.navigateService.navigateTo(url);
  }
  logout() {
    this.authService
      .logout$()
      .pipe(
        tap(() => {
          localStorage.removeItem('isSidebarOpen');
          this.router.navigate(['/login']);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  toggleSidebar() {
    const newState = !this.$isSIdeBarOpen$();
    this.$isSIdeBarOpen$.set(newState);
    localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
  }
  hasPermissionUser(premission: string) {
    return this.authService.hasPermission(premission);
  }
}
