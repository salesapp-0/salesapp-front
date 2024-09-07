import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api-service.service";
import {Observable} from "rxjs";
import {Statistics} from "../../core/interfaces/statistics.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(ApiService);


  public getStatistics$(filterByDay:{ name: string }): Observable<Statistics> {
    let filterByDays = false;
    let filterByYear = false;
    if(filterByDay.name === 'დღე'){
      filterByDays = true;
    }else if(filterByDay.name === 'წელი'){
      filterByYear = true;
    }
    const path = `/dashboard/statistics?filterByDay=${filterByDays}&filterByYear=${filterByYear}`;
    return this.http.get(path)
  }
}
