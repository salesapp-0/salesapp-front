import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api-service.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  private readonly http = inject(ApiService);
  public $refreshEmployee = new BehaviorSubject<boolean>(true);
  constructor() {}

  public filterOrg$(
    campaignId: string,
    organizationId: string,
    page: number,
    sellingGroupName?: string,
    search?: string,
    position?: { name: string }
  ) {
    let path = `/${campaignId}/filter?organizationId=${organizationId}&page=${page}&limit=8`;
    if (sellingGroupName) {
      path += `&sellingGroupName=${encodeURIComponent(sellingGroupName)}`;
    }
    if (search) {
      path += `&search=${encodeURIComponent(search)}`;
    }
    if (position) {
      path += `&positionName=${encodeURIComponent(position?.name)}`;
    }
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
  getSpecificEmployee$(id: string) {
    const path = `/employee/${id}`;
    return this.http.get(path);
  }
  deactivateEmployee$(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`/employee/deactivate/${id}`, {
      isActive,
    });
  }

  public delete$(id: string, campaignId: string): Observable<any> {
    const path = `/${campaignId}/${id}`;
    return this.http.delete(path);
  }
}
