import { TermAttendance } from "./student-term-attendance.model";

export interface StudentAttendances {
    daysPresent: number;
    daysAbsent: number;
    totalWorkingDays: number;
    percentage: number;
    termWiseBreakdown?: TermAttendance[];
  }
  