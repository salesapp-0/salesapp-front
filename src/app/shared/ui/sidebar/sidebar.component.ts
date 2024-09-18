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
import { Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs';
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
  constructor() {
    super();
    this.router.events
      .pipe(
        map((event) => {
          if (event.constructor.name === 'NavigationEnd') {
            this.$currentRoute$.set(this.router.url);
            console.log(this.router.url);
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  ngOnInit(): void {
    const savedState = localStorage.getItem('isSidebarOpen');
    console.log(savedState);

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
    this.$isSIdeBarOpen$.set(!this.$isSIdeBarOpen$());
    localStorage.setItem(
      'isSidebarOpen',
      JSON.stringify(this.$isSIdeBarOpen$())
    );
  }
  hasPermissionUser(premission: string) {
    return this.authService.hasPermission(premission);
  }
}
