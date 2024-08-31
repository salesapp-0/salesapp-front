import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BuyerOrganizations} from "../../core/interfaces/buyer-organizations.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  getOrganizations(page: number = 1, limit: number = 10, filters: any = {}): Observable<BuyerOrganizations> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<BuyerOrganizations>(this.baseUrl+'/buyer-organization/filter', { params,withCredentials:true });
  }


  createBuyerOrganization(
    legalName: string,
    tradeName: string,
    identificationCode: string,
    legalAddress: string,
    actualAddress: string,
    serviceCost: number,
    paymentDate: string, // Assuming paymentDate is a string; adjust if needed
    bank: string,
    bankAccountNumber: string,
    contactPerson: string,
    contactPhoneNumber: string,
    contactMail: string
  ): Observable<BuyerOrganizations> {
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
      contactMail
    };

    return this.http.post<BuyerOrganizations>(`${this.baseUrl}/buyer-organization`, payload, { withCredentials: true });
  }
}
