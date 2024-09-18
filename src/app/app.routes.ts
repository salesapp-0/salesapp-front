import { Routes } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { authGuard } from './shared/guards/auth.guard';
import { permissionsGuard } from './shared/guards/permissions.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuard],
    providers: [AuthService],
  },
  {
    path: 'main-page',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard, permissionsGuard],
    providers: [AuthService],
    data: { permissions: ['UPDATE_ARTICLES'] },
  },
  {
    path: 'organizations',
    loadComponent: () =>
      import('./features/organizations/organizations.component').then(
        (m) => m.OrganizationsComponent
      ),
    canActivate: [authGuard],
    providers: [AuthService],
  },
  {
    path: 'add-organization',
    loadComponent: () =>
      import(
        './features/organizations/add-organization/add-organization.component'
      ).then((m) => m.AddOrganizationComponent),
    canActivate: [authGuard],
    providers: [AuthService],
  },
  {
    path: 'edit-organizations/:id',
    loadComponent: () =>
      import(
        './features/organizations/add-organization/add-organization.component'
      ).then((m) => m.AddOrganizationComponent),
    canActivate: [authGuard],
    providers: [AuthService],
  },
  {
    path: 'specific-organization/:id',
    loadComponent: () =>
      import(
        './features/organizations/specific-organization/specific-organization.component'
      ).then((m) => m.SpecificOrganizationComponent),
    canActivate: [authGuard],
    providers: [AuthService],
  },
  {
    path: 'soft-settings',
    loadComponent: () =>
      import('./features/soft/soft-settings/soft-settings.component').then(
        (m) => m.SoftSettingsComponent
      ),
    canActivate: [authGuard, permissionsGuard],
    providers: [AuthService],
    data: { permissions: ['READ_SOFT_SETTINGS'] },
  },
];
