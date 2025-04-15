
export interface StudentParentGardians {
    guardianId:number;
    name: string;
    qualification: string;
    occupation: string;
    phoneNumber: string;
    emailId: string;
    age:number;
    relationType: 'Father' | 'Mother' | 'Guardian';
    studentId:number;
  }
  