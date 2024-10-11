import {Pagination} from "../../../../../../core/interfaces/pagination.interface";

export interface IEmployee extends  Pagination{
  data: Data[];
}
export interface IPosition extends Pagination {
  data:Position[]
}

export interface Data {
  id: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  sellingGroup?: string;
  email?: string;
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  buyerOrganization?: BuyerOrganization;
  position: Position;
  user?: User;
}
export interface Position {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
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

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  is2FAEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  buyerOrganziaitonId?: string;
  roles: Role[];
}
export interface Role {
  id: string;
  role: Role2;
}

export interface Role2 {
  id: string;
  name: string;
  nameEn: any;
  nameRu: any;
  description: any;
  createdAt: string;
  updatedAt: string;
}
