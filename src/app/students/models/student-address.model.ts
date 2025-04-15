export interface StudentAddress {
  addressId:number;
  addressType: string | 'Permanent';
  houseNumber: string;
  area: string;
  city: string;
  state: string;
  country:string;
  zipCode: string;
  studentId: number;
  landMark: string;
}
