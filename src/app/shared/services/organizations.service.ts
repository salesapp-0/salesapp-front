import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BuyerOrganization,
  BuyerOrganizations,
} from '../../core/interfaces/buyer-organizations.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getOrganizations(
    page: number = 1,
    limit: number = 10,
    filters: any = {}
  ): Observable<BuyerOrganizations> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<BuyerOrganizations>(
      this.baseUrl + '/buyer-organization/filter',
      { params, withCredentials: true }
    );
  }
  getOrganizationById(id: string): Observable<BuyerOrganization> {
    return this.http.get<BuyerOrganization>(
      `${this.baseUrl}/buyer-organization/${id}`,
      { withCredentials: true }
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/user/${id}`, {
      withCredentials: true,
    });
  }
  deactivateOrganization(id: string, isActive: boolean): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/buyer-organization/deactivate/${id}`,
      { isActive, withCredentials: true }
    );
  }

  createBuyerOrganization(
    legalName: string,
    tradeName: string,
    identificationCode: string,
    legalAddress: string,
    actualAddress: string,
    serviceCost: string,
    paymentDate: string,
    bank: string,
    bankAccountNumber: string,
    contactPerson: string,
    contactPhoneNumber: string,
    contactMail: string,
    contactMails: string[]
  ): Observable<BuyerOrganization> {
    const payload = {
      legalName,
      tradeName,
      identificationCode,
      legalAddress,
      actualAddress,
      serviceCost,
      paymentDate,
      bank,
      bankAccountNumber,
      contactPerson,
      contactPhoneNumber,
      contactMail,
      contactMails,
    };

    return this.http.post<BuyerOrganization>(
      `${this.baseUrl}/buyer-organization`,
      payload,
      { withCredentials: true }
    );
  }

  updateBuyerOrganization(
    legalName: string,
    tradeName: string,
    identificationCode: string,
    legalAddress: string,
    actualAddress: string,
    serviceCost: string,
    paymentDate: string,
    bank: string,
    bankAccountNumber: string,
    contactPerson: string,
    contactPhoneNumber: string,
    contactMail: string,
    id: string,
    contactMails: string[]
  ): Observable<BuyerOrganization> {
    const payload = {
      legalName,
      tradeName,
      identificationCode,
      legalAddress,
      actualAddress,
      serviceCost,
      paymentDate,
      bank,
      bankAccountNumber,
      contactPerson,
      contactPhoneNumber,
      contactMails,
      contactMail,
    };

    return this.http.put<BuyerOrganization>(
      `${this.baseUrl}/buyer-organization/${id}`,
      payload,
      { withCredentials: true }
    );
  }
  createBuyerOrganziationCotract(
    organizationId: string,
    fileId: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/buyer-organization/buyer-contract`,
      { organizationId, fileId, withCredentials: true }
    );
  }
}
