import { StudentAddress } from './student-address.model'
import { StudentParentGardians } from './student-parent-guardians.models';
import { StudentGrade } from './student-current-academic.model';
import { StudentPreviousAcademicDetails } from './student-previous-academic.model';
import { StudentAttendances } from './student-attendence.model';
import { StudentDemographic } from './student-demographic.model';
import { StudentFeeDetails } from './student-fee.model';
import { StudentTransport } from './student-transport.model';
import { StudentDocuments } from './student.documents.model';
import { StudentHealthInfo } from './student-health.model';

export interface StudentResponse {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age:number;
  emailId: string;
  phoneNumber: string;
  identityMarks: string;
  profilePhoto: string;
  gender:string;
  
  studentParentGuardians: StudentParentGardians[];
  studentGrade: StudentGrade;
  studentPreviousAcademicDetails: StudentPreviousAcademicDetails[];
  studentAddresses: StudentAddress[];
  studentDocuments: StudentDocuments[];
  studentDemographic: StudentDemographic;
  transport: StudentTransport;
  feeDetails: StudentFeeDetails;
  attendance: StudentAttendances;
  healthInfo: StudentHealthInfo;
  loginCredentials: LoginCredentials;
}











export interface LoginCredentials {
  userName: string;
  password: string;
}
