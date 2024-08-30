import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api-service.service";
import {Observable} from "rxjs";
import {DefaultResponse} from "../../core/http";
import {Statistics} from "../../core/interfaces/statistics.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(ApiService);


  public getStatistics$(): Observable<Statistics> {
    const path = `/dashboard/statistics`;
    return this.http.get(path)
  }
}
