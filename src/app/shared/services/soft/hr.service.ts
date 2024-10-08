import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api-service.service';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  private readonly http = inject(ApiService);
  public $refreshEmployee = new BehaviorSubject<boolean>(true);
  constructor() {}

  public filterOrg$(campaignId: string, organizationId: string, page: number) {
    const path = `/${campaignId}/filter?organizationId=${organizationId}&page=${page}&limit=8`;
    return this.$refreshEmployee.pipe(
      switchMap((_) => {
        return this.http.get(path);
      })
    );
  }
  getRoles$() {
    const path = `/roles`;
    return this.http.get(path);
  }
  addEmployee$(data: any) {
    const path = `/employee`;
    return this.http.post(path, data);
  }

  updateEmployee$(data: any, id: string) {
    const path = `/employee/${id}`;
    return this.http.put(path, data);
  }
}
