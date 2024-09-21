import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (route.routeConfig?.path === 'login') {
    return authService.isAuthorized$().pipe(
      map((auth) => {
        if (auth?.isAuthorized) {
          router.navigate(['/main-page']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }

  return authService.isAuthorized$().pipe(
    map((auth) => {
      if (auth?.isAuthorized) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      return of(false);
    })
  );
};
