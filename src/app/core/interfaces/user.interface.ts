export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  is2FAEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
  buyerOrganziaitonId: string;
}

export interface Role {
  id: string;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  description: any;
  createdAt: string;
  updatedAt: string;
  rolePermissions: RolePermission[];
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
