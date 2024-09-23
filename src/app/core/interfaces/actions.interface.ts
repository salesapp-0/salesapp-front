import { BuyerOrganization } from './buyer-organizations.interface';

export interface IActions<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Action {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  buyerOrganization: BuyerOrganization;
}
