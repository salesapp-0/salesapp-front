import {inject, Inject, Injectable} from '@angular/core';
import {DefaultResponse, HttpService} from "../../core/http";
import {delay, Observable, tap} from "rxjs";
import {ApiService} from "./api-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  startUrl = '/auth/user'
  private readonly http = inject(ApiService);
  constructor() {
  }
  //TODO:COOKIE DOST PASS WHEN REFRESH
  public isAuthorized$(): Observable<any> {
    const path = `/auth/is-authorized`;
    return this.http.get(path).pipe(
      tap(console.log)
    )
  }

  public login$(loginData:any): Observable<DefaultResponse<any>> {
    const path = `/auth/login`;
    return this.http.post(path,loginData)
  }
}
