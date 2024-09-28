import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api-service.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Action, IActions } from '../../../core/interfaces/actions.interface';

@Injectable({
  providedIn: 'root',
})
export class SoftParameterService {
  private readonly http = inject(ApiService);
  private refetchAction$ = new BehaviorSubject(true);

  public getActions$(organizationId: string, page: number) {
    const path = `/action-options?organizationId=${organizationId}&page=${page}&limit=8`;
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
  }): Observable<IActions<Action>> {
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
  ): Observable<IActions<Action>> {
    const path = `/action-options/${id}`;
    return this.http.put(path, actionOption);
  }

  public getSpecificActionOption$(id: string): Observable<Action> {
    const path = `/action-options/${id}`;
    return this.http.get(path);
  }
  //

  public getPositions$(organizationId: string, page: number) {
    const path = `/positions/filter?organizationId=${organizationId}&page=${page}&limit=8`;
    return this.refetchAction$.pipe(
      switchMap((res) => {
        return this.http.get(path);
      })
    );
  }

  public getPositionDescription$(organizationId: string) {
    const path = `/positions/description/?organizationId=${organizationId}`;
    return this.http.get(path);
  }

  public addPosition$(positionData: any) {
    const path = `/positions`;
    return this.http.post(path, positionData);
  }
  public getSpecificPositionOption$(id: string): Observable<Action> {
    const path = `/positions/${id}`;
    return this.http.get(path);
  }
  public updatePosition$(positionData: any, id: string) {
    const path = `/positions/${id}`;
    return this.http.patch(path, positionData);
  }
  //
  public getProducts$(organizationId: string, page: number, type: string) {
    const path = `/${type}/filter?organizationId=${organizationId}&page=${page}&limit=8`;
    return this.http.get(path);
  }

  public updateProduct$(positionData: any, id: string) {
    const path = `/products/${id}`;
    return this.http.patch(path, positionData);
  }

  public addProduct$(positionData: any) {
    const path = `/products`;
    return this.http.post(path, positionData);
  }
  public getSellingGroupDescription$(organizationId: string) {
    const path = `/products/description/?organizationId=${organizationId}`;
    return this.http.get(path);
  }
  public getSpecificProductOption$(id: string): Observable<any> {
    const path = `/products/${id}`;
    return this.http.get(path);
  }

  //
  public getPermissions$(): Observable<any> {
    const path = `/permissions`;
    return this.http.get(path);
  }
}
