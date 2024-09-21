import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api-service.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoftParameterService {
  private readonly http = inject(ApiService);
  private refetchAction$ = new BehaviorSubject(true);
  public getActions$(organizationId: string, page: number) {
    const path = `/action-options?organizationId=${organizationId}&page=${page}&limit=10`;
    return this.refetchAction$.pipe(
      switchMap((res) => {
        return this.http.get(path);
      })
    );
  }
  refetchAction() {
    this.refetchAction$.next(true);
  }
  public createActionOption$(actionOption: {
    name: string;
    description?: string;
    buyerOrganization: { id: string };
  }): Observable<any> {
    const path = `/action-options`;
    return this.http.post(path, actionOption);
  }
  public updateActionOption$(
    actionOption: {
      name: string;
      description?: string;
      buyerOrganization: { id: string };
    },
    id: string
  ): Observable<any> {
    const path = `/action-options/${id}`;
    return this.http.put(path, actionOption);
  }

  public getSpecificActionOption$(id: string): Observable<any> {
    const path = `/action-options/${id}`;
    return this.http.get(path);
  }
}
