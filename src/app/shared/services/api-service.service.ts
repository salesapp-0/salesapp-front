import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  post(url?: string, body?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.post(`${this.baseUrl}${url}`, body, httpOptions);
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }

  getOrganizations(page: number = 1, limit: number = 10, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get(this.baseUrl+'/buyer-organization/filter', { params });
  }
}
