import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { OrganizationsService } from './organizations.service';
import { FormGroup } from '@angular/forms';
import { BuyerOrganization } from '../../core/interfaces/buyer-organizations.interface';
import { EventEmitter } from 'stream';

@Injectable()
export class OrganizationHelperService {
  constructor(private organizationService: OrganizationsService) {}

  getOrganizationFormData(organizationForm: FormGroup): any {
    return {
      legalName: organizationForm.get('legalName')?.value,
      tradeName: organizationForm.get('tradeName')?.value,
      identificationCode: organizationForm.get('identificationCode')?.value,
      legalAddress: organizationForm.get('legalAddress')?.value,
      actualAddress: organizationForm.get('actualAddress')?.value,
      serviceCost: organizationForm.get('serviceCost')?.value,
      paymentDate: organizationForm.get('paymentDate')?.value,
      bank: organizationForm.get('bank')?.value,
      bankAccountNumber: organizationForm.get('bankAccountNumber')?.value,
      contactPerson: organizationForm.get('contactPerson')?.value,
      contactPhoneNumber: organizationForm.get('contactPhoneNumber')?.value,
      contactMail: organizationForm.get('contactMail')?.value,
    };
  }

  createOrganization(
    organizationData: BuyerOrganization,
    unsubscribe$: any,
    close: any
  ): void {
    this.organizationService
      .createBuyerOrganization(
        organizationData.legalName,
        organizationData.tradeName,
        organizationData.identificationCode,
        organizationData.legalAddress,
        organizationData.actualAddress,
        organizationData.serviceCost,
        organizationData.paymentDate,
        organizationData.bank,
        organizationData.bankAccountNumber,
        organizationData.contactPerson,
        organizationData.contactPhoneNumber,
        organizationData.contactMail
      )
      .pipe(
        map((res) => close),
        takeUntil(unsubscribe$)
      )
      .subscribe();
  }

  updateOrganization(
    organizationData: BuyerOrganization,
    organizationId: string,
    unsubscribe$: any,
    close: any
  ): void {
    this.organizationService
      .updateBuyerOrganization(
        organizationData.legalName,
        organizationData.tradeName,
        organizationData.identificationCode,
        organizationData.legalAddress,
        organizationData.actualAddress,
        organizationData.serviceCost,
        organizationData.paymentDate,
        organizationData.bank,
        organizationData.bankAccountNumber,
        organizationData.contactPerson,
        organizationData.contactPhoneNumber,
        organizationData.contactMail,
        organizationId
      )
      .pipe(
        map((res) => close),
        takeUntil(unsubscribe$)
      )
      .subscribe();
  }
}
