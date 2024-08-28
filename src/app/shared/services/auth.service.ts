import {inject, Inject, Injectable} from '@angular/core';
import {DefaultResponse, HttpService} from "../../core/http";
import {Observable} from "rxjs";
import {ApiService} from "./api-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  startUrl = '/auth/user'
  private readonly http = inject(ApiService);
  constructor() {
  }
  public isAuthorized$(): Observable<DefaultResponse<any>> {
    const path = `/auth/is-authorized`;
    return this.http.get(path)
  }

  public login$(loginData:any): Observable<DefaultResponse<any>> {
    const path = `/auth/login`;
    return this.http.post(path,loginData)
  }
}
