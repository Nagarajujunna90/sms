
export interface ParentGuardian {
    guardianId:number;
    name: string;
    qualification: string;
    profession: string;
    phoneNumber: string;
    email: string;
    age:number;
    relationType: 'Father' | 'Mother' | 'Guardian';
  }
  