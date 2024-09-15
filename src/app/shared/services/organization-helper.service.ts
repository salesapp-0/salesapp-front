import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { OrganizationsService } from './organizations.service';
import { FormGroup } from '@angular/forms';
import { BuyerOrganization } from '../../core/interfaces/buyer-organizations.interface';
import { EventEmitter } from 'stream';

@Injectable()
export class OrganizationHelperService {
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
      contactMails: organizationForm.get('contactMails')?.value,
    };
  }
}
