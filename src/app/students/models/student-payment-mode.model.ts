export interface Payment {
    date: string; // Or Date
    amount: number;
    mode: string;
    transactionId?: string;
  }