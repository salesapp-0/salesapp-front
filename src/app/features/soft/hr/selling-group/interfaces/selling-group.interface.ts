import {Pagination} from "../../../../../core/interfaces/pagination.interface";

export interface IWrapperGroup  extends  Pagination{
  data:ISellingGroup[]
}
export interface ISellingGroup {
  id: string
  name: string
  headEmployee: HeadEmployee
  employees: Employee[]
  createdAt: string
  updatedAt: string
}

export interface HeadEmployee {
  id: string
  firstName: string
  lastName: string
  createdAt:string
}

export interface Employee {
  id: string
  personalNumber: string
  firstName: string
  lastName: string
}
