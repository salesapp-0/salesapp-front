import {inject, Inject, Injectable} from '@angular/core';
import {DefaultResponse, HttpService} from "../../core/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  startUrl = '/auth/user'
  private readonly http = inject(HttpService);
  constructor() {
    this.isAuthorized$('user').subscribe((res) => {
      console.log(res,"123")
    })
  }
  public isAuthorized$(endpointUrl: string): Observable<DefaultResponse<any>> {
    const path = `/auth/${endpointUrl}`;
    return this.http.get$({ path })
  }



}
