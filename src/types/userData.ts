
export interface User {
  email: string,
  name: string,
  profileUrl: string,
  provider: string,
}

export interface DeliveryAddress {
  id: number,
  name: string,
  phoneNumber: string,
  addressLine1: string,
  addressLine2: string,
  zipCode: string,
  isDefault: boolean,
}