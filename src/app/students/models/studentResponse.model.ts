export interface Student {
    studentId: number;
    userName: string;
    registrationId: number;
    firstName: string;
    lastName: string;
    motherName: string;
    fatherName: string;
    guardianName: string;
    gender: string;
    age: number;
    dateOfBirth: string; // or Date
    contactInfo: ContactInfo | null;
    healthInfo: HealthInfo | null;
    hobbies: string[];
    profileImage: string | null;
    studentAddresses: StudentAddress[];
    studentParentGuardians: StudentParentGuardian[];
    studentGrade: StudentGrade;
    studentDemographic: StudentDemographic | null;
  }
  
  export interface ContactInfo {
    email?: string;
    phone?: string;
    emergencyContact?: string;
  }
  
  
  export interface StudentAddress {
    addressId: number;
    addressType: string;
    houseNumber?: string;
    area?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }
  
  export interface StudentParentGuardian {
    id?: number;
    name: string;
    guardianId: number;
    guardianType: string; 
    mobileNumber: string;
    relationType: string;
    contactNumber?: string;
    occupation:string;
    email:string;
    age:number;
    qualification:string;
  }
  
  export interface StudentGrade {
    id?: number;
    classGrade: string;
    rollNumber: string;
    section: string;
  }
  
  export interface HealthInfo {
    bloodGroup?: string;
    allergies?: string[];
    medicalConditions?: string[];
  }
  
  export interface StudentDemographic {
    demographicId:number;
    nationality?: string;
    religion?: string;
    caste?: string;
    incomeGroup?: string;
    motherTongue:string
  }
  