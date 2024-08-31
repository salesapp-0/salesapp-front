import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private router = inject(Router)

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
