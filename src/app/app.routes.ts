import { Routes } from '@angular/router';
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canActivate:[authGuard]
  }
];
