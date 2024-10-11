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
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { unsub } from '../../classes/unsub.class';
import { AuthService } from '../../services/auth.service';
import { NavigateService } from '../../services/navigate.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { PermissionsEnum } from '../../../core/enums/premissions.enum';
import {routesConfig} from "./configs/entity";
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
  private activatedRoute = inject(ActivatedRoute);

  $currentRoute$ = signal('');
  $isSIdeBarOpen$ = signal(true);
  routes = routesConfig


  ngOnInit(): void {
    const savedState = localStorage.getItem('isSidebarOpen');
    this.setCurrentRoute();
    if (savedState !== null) {
      this.$isSIdeBarOpen$.set(JSON.parse(savedState));
    }
  }

  private setCurrentRoute(): void {
    const currentRoute = this.activatedRoute.snapshot;
    const currRoute = this.getFullRouteName(currentRoute);
    this.$currentRoute$.set('/' + currRoute);
  }

  private getFullRouteName(route: any): string {
    const pathSegments: string[] = [];
    while (route) {
      if (route.routeConfig) {
        pathSegments.push(route.routeConfig.path || '');
      }
      route = route.firstChild;
    }
    return pathSegments.reverse().join('/');
  }

  onNavigate(url: string) {
    this.navigateService.navigateTo(url);
  }

  toggleTree(route: any) {
    if (!route.isOpen && !this.$isSIdeBarOpen$()) {
      this.toggleSidebar();
    }
    route.isOpen = !route.isOpen;
    this.$currentRoute$.set('');
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

  isRouteActive(route: any): boolean {
    return (
      route.isOpen ||
      this.$currentRoute$() === '/employees' ||
      this.$currentRoute$() === '/selling-group'
    );
  }

}
