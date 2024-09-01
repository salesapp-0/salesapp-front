import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private router = inject(Router)

  navigateTo(route: string, query?: { [key: string]: any }): void {
    this.router.navigate([route], { queryParams: query });
  }
}
