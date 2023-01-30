
export interface Person {
  countryIc: string
  addressId: string
  additionalText: string
  postalIndex: string
  personTypeIc: string
  resident: boolean
  birthDate: Date
  firstName: string
  name: string
  age: number
  phone: string
  email: string
}

export const usePerson = () => {
  return useState<Person | null>('person', () => null)
}
