import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api-service.service";
import {Observable} from "rxjs";
import {Statistics} from "../../core/interfaces/statistics.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(ApiService);


  public getStatistics$(filterByDay:{ name: string,key:string }): Observable<Statistics> {
    let filterByDays = false;
    let filterByYear = false;
    let filterByMonth = false;
    if(filterByDay.key === 'day'){
      filterByDays = true;
    }else if(filterByDay.key === 'year'){
      filterByYear = true;
    }else if(filterByDay.key === 'month'){
      filterByMonth = true;
    }
    const path = `/dashboard/statistics?filterByDay=${filterByDays}&filterByYear=${filterByYear}&filterByMonth=${filterByMonth}`;
    return this.http.get(path)
  }
}
