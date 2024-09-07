import {Component, inject, OnInit, signal} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, Observable, takeUntil, tap} from "rxjs";
import {unsub} from "../../classes/unsub.class";
import {AuthService} from "../../services/auth.service";
import {NavigateService} from "../../services/navigate.service";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule,FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent extends unsub{
  private router = inject(Router)
  private authService = inject(AuthService)
  private navigateService = inject(NavigateService)
  $mode$ = signal('light')
  $currentRoute$ = signal('')
  constructor() {
    super();
    this.router.events.pipe(
      map((event) => {
        if (event.constructor.name === "NavigationEnd") {
          this.$currentRoute$.set(this.router.url)
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  handleSelectMode(mode:string) {
    this.$mode$.set(mode)
  }
  onNavigate(url:string) {
    this.navigateService.navigateTo(url)
  }
  logout() {
    this.authService.logout$()
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
