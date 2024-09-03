export interface SpecificOrganization {
  id: string
  legalName: string
  tradeName: string
  identificationCode: string
  contactPerson: string
  contactPhoneNumber: string
  contactMail: string
  legalAddress: string
  actualAddress: string
  serviceCost: string
  paymentDate: string
  bank: string
  userId: string
  bankAccountNumber: string
  isActive: boolean
  deactivationReason: any
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  phoneNumber: string
  is2FAEnabled: boolean
  createdAt: string
  updatedAt: string
}
