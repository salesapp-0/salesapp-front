export interface BuyerOrganizations {
  data: BuyerOrganization[]
  total: number
}

export interface BuyerOrganization {
  id: string
  legalName: string
  tradeName: string
  identificationCode: string
  legalAddress: string
  actualAddress: string
  serviceCost: number
  paymentDate: string
  bank: string
  bankAccountNumber: string
  isActive: boolean
  deactivationReason: any
  createdAt: string
  updatedAt: string
  status: string
  contactPerson:string
  contactPhoneNumber:string
  contactMail:string
  userId:string
}
