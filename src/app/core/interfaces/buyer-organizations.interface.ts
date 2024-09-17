export interface BuyerOrganizations {
  data: BuyerOrganization[];
  total: number;
}

export interface BuyerOrganization {
  id: string;
  legalName: string;
  tradeName: string;
  identificationCode: string;
  legalAddress: string;
  actualAddress: string;
  serviceCost: string;
  paymentDate: string;
  bank: string;
  bankAccountNumber: string;
  isActive: boolean;
  deactivationReason: any;
  createdAt: string;
  updatedAt: string;
  status: string;
  contactPerson: string;
  contactPhoneNumber: string;
  contactMail: string;
  userId: string;
  contactMails: string[];
  statusColor: Status;
}

export interface Status {
  name: string;
  textColor: string;
  bgColor: string;
}
