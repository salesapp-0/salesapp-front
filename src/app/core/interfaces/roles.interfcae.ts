export interface RolePermissions {
  id: string;
  name: string;
  nameEn: any;
  nameRu: any;
  description: any;
  createdAt: string;
  updatedAt: string;
  buyerOrganization: BuyerOrganization;
  rolePermissions: RolePermission[];
}

export interface BuyerOrganization {
  id: string;
  legalName: string;
  tradeName: string;
  identificationCode: string;
  contactPerson: string;
  contactPhoneNumber: string;
  contactMail: string;
  contactMails: string[];
  legalAddress: string;
  actualAddress: string;
  serviceCost: string;
  paymentDate: string;
  bank: string;
  userId: string;
  bankAccountNumber: string;
  isActive: boolean;
  deactivationReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  id: string;
  permission: Permission;
}

export interface Permission {
  id: string;
  value: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  createdAt: string;
  updatedAt: string;
}
