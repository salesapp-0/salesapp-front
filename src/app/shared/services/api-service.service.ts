import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BuyerOrganizations } from '../../core/interfaces/buyer-organizations.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  post(url?: string, body?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    return this.http.post(`${this.baseUrl}${url}`, body, httpOptions);
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }
  put(url?: string, body?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    return this.http.put(`${this.baseUrl}${url}`, body, httpOptions);
  }

  patch(url?: string, body?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    return this.http.patch(`${this.baseUrl}${url}`, body, httpOptions);
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    return this.http.delete(`${this.baseUrl}${url}`, httpOptions);
  }
}
