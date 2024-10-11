import {Permission} from "../../../../../../core/interfaces/user.interface";
import {BuyerOrganization} from "./employee.interface";


export interface Roles {
  id: string
  name: string
  nameEn: string
  nameRu: string
  description: string
  createdAt: string
  updatedAt: string
  buyerOrganization: BuyerOrganization
  rolePermissions: RolePermission[]
}

export interface RolePermission {
  id: string
  permission: Permission
}


