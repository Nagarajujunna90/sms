export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age:number;
  email: string;
  phoneNumber: string;
  identityMarks: string;
  profilePhoto: string;
  gender:string;
  bloodGroup: string;
  
  studentParentGuardians: ParentGuardian[];
  studentGrade: GradeInfo;
  studentPreviousAcademicDetails: StudentPreviousAcademicDetails[];
  studentAddresses: Address[];
  documents: DocumentDetail[];
  studentDemographic: Demographic;
  transport: Transport;
  feeDetails: FeeDetails;
  attendance: Attendance;
  healthInfo: HealthInfo;
  loginCredentials: LoginCredentials;
}


export interface ParentGuardian {
  studentId: number;
  guardianId:number;
  name: string;
  qualification: string;
  occupation: string;
  mobileNumber: string;
  email: string;
  age:number;
  relationType: 'Father' | 'Mother' | 'Guardian';
}

export interface GradeInfo {
  gradeId:number;
  classGrade: string;
  section: string;
  rollNumber: number;
  admissionNumber: string;
  academicYear: string;
}

export interface StudentPreviousAcademicDetails {
  grade: string;
  section: string;
  academicYear:string;
  rollNumber:number;
  schoolName: string;
  board:string;
  remark: string;
  transferCertificate: boolean;
  duration: string;
  percentage:string;
}



export interface Address {
  addressId:number;
  houseNumber: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark?: string;
  addressType: string;
}

export interface DocumentDetail {
  documentType: string;
  documentNumber: string;
}

export interface Demographic {
  demographicId:number;
  nationality: string;
  religion: string;
  caste: string;
  subCaste: string;
  motherTongue: string;
}

export interface Transport {
  modeOfTransport: 'Own' | 'School Bus';
  pickupPoint: string;
  busRouteNumber: string;
  driverContact: string;
  distanceFromSchool: string;
}

export interface FeeDetails {
  totalFees: number;
  feePaid: number;
  balance: number;
  dueDates: string[]; // Or use Date[] if preferred
  paymentHistory: Payment[];
}

export interface Payment {
  date: string; // Or Date
  amount: number;
  mode: string;
  transactionId?: string;
}

export interface Attendance {
  daysPresent: number;
  daysAbsent: number;
  totalWorkingDays: number;
  percentage: number;
  termWiseBreakdown?: TermAttendance[];
}

export interface TermAttendance {
  term: string;
  present: number;
  absent: number;
  workingDays: number;
}

export interface HealthInfo {
  allergies: string;
  medicalConditions: string;
  emergencyContact: string;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}
