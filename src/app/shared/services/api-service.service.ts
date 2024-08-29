import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
}
