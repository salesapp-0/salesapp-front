import { Routes } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./shared/services/auth.service";
import {HttpService} from "./core/http";
import {EnvironmentService} from "./shared/services/envirment.service";
import {authGuard} from "./shared/guards/auth.guard";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {LoginComponent} from "./features/login/login.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canActivate: [authGuard],
    providers:[HttpService,AuthService]
  },
  {
    path: 'main-page',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    providers:[HttpService,AuthService]
  },
];
