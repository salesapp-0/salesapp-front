import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { PermissionsEnum } from '../../core/enums/premissions.enum';
import { availableRoutes } from '../../core/configs/routes.config';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredPermissions = route.data['permissions'] as string[];

  return authService.getUser$().pipe(
    map((res) => {
      const userPermissions = res.roles.flatMap((role) =>
        role.role.rolePermissions.map(
          (permission) => permission.permission.value
        )
      );
      const firstAccessibleRoute = availableRoutes.find((route) =>
        route.permissions.every((permission) =>
          userPermissions.includes(permission)
        )
      );
      const hasPremission = requiredPermissions.every((item: string) =>
        userPermissions.includes(item)
      );

      if (!hasPremission) {
        router.navigate([firstAccessibleRoute?.path]);
        return false;
      }
      return true;
    })
  );
};
