import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (route.routeConfig?.path === 'login') {
    return authService.isAuthorized$().pipe(
      map((auth) => {
        if (auth?.isAuthorized) {
          router.navigate(['/dashboard']);
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
      router.navigate(['/login']);
      return of(false);
    })
  );
};
