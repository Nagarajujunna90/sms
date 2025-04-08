export interface Student {
  studentId: number; // ✅ Add this field
  userName: string;
  firstName: string;
  lastName: string;
  motherName: string;
  fatherName: string;
  guardianName: string;
  gender: string;
  age: number;
  dateOfBirth: string; // Format: YYYY-MM-DD
  nationality: string;
  religion: string;
  mobileNumber: string;
  emergencyNumber: string;
  weight: number;
  height: number;
  identityMarks: string;
  disability: string;
  bloodGroup: string;
  hobbies: string[];
}
