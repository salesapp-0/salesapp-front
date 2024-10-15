import {inject, Injectable} from '@angular/core';
import {ApiService} from "../api-service.service";
import {BehaviorSubject, switchMap} from "rxjs";
import {buildQueryParams} from "../../utils/buildQuery.util";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private readonly http = inject(ApiService);
  public $refreshSubject = new BehaviorSubject<boolean>(true);
  constructor() { }

  public filter$(
    campaignId: string,
    organizationId: string,
    page: number,
    options: {
      name?: string,
      headEmployeeName?: string,
      limit?: number
    } = {}
  ) {
    const { name, headEmployeeName, limit = 4 } = options;

    const queryParams = buildQueryParams({
      buyerOrganizationId: organizationId,
      name,
      headEmployeeName,
      page,
      limit
    });

    const path = `/${campaignId}/filter?${queryParams}`;

    return this.$refreshSubject.pipe(
      switchMap(() => {
        return this.http.get(path);
      })
    );
  }


}
