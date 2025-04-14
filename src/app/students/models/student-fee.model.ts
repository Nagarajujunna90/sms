import { Payment } from "./student-payment-mode.model";

export interface StudentFeeDetails {
    totalFees: number;
    feePaid: number;
    balance: number;
    dueDates: string[]; // Or use Date[] if preferred
    paymentHistory: Payment[];
  }
  