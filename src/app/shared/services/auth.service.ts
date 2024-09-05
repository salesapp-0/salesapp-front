import {inject, Inject, Injectable, signal} from '@angular/core';
import {delay, Observable, tap} from "rxjs";
import {ApiService} from "./api-service.service";
import {User} from "../../core/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  startUrl = '/auth/user'
  $roleUser$ = signal('Admin')
  private readonly http = inject(ApiService);
  constructor() {
  }
  public isAuthorized$(): Observable<any> {
    const path = `/auth/is-authorized`;
    return this.http.get(path).pipe(
      tap(console.log)
    )
  }

  public login$(loginData:any): Observable<any> {
    const path = `/auth/login`;
    return this.http.post(path,loginData)
  }
  public logout$(): Observable<any> {
    const path = `/auth/logout`;
    return this.http.post(path)
  }
  public getUser$(): Observable<User> {
    const path = `/auth/user`;
    return this.http.get(path).pipe(
      tap((res) => {
        this.$roleUser$.set(res.roles[0].role.name)
      })
    )
  }
}
