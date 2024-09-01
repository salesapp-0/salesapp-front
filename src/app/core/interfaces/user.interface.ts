export interface User {
  id: string
  username: string
  email: string
  phoneNumber: string
  is2FAEnabled: boolean
  createdAt: string
  updatedAt: string
  roles: Role[]
}

export interface Role {
  id: string
  role: Role2
}

export interface Role2 {
  id: string
  name: string
  description: any
  updatedAt: string
}
