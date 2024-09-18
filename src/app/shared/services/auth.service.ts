import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ApiService } from './api-service.service';
import { User } from '../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  startUrl = '/auth/user';
  $roleUser$ = signal('Admin');
  cache = new Map();
  public userPermissions: WritableSignal<string[]> = signal([]);
  private readonly http = inject(ApiService);
  constructor() {}
  public isAuthorized$(): Observable<any> {
    const path = `/auth/is-authorized`;
    return this.http.get(path).pipe(tap(console.log));
  }

  public login$(loginData: any): Observable<any> {
    const path = `/auth/login`;
    return this.http.post(path, loginData);
  }
  public logout$(): Observable<any> {
    const path = `/auth/logout`;
    return this.http.post(path);
  }
  public getUser$(): Observable<User> {
    const path = `/auth/user`;
    if (this.cache.has(path)) {
      return of(this.cache.get(path));
    }
    return this.http.get(path).pipe(
      tap((res) => {
        this.$roleUser$.set(res.roles[0].role.name);
        const userPermissions = res.roles.flatMap((role) =>
          role.role.rolePermissions.map(
            (permission) => permission.permission.value
          )
        );
        this.userPermissions.set(userPermissions);
        this.cache.set(path, res);
      })
    );
  }
  hasPermission(permission: string): boolean {
    return this.userPermissions().includes(permission);
  }
}
