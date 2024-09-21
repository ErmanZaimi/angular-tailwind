export interface Contract {
    name: string;
    email: string;
    date: string; // Consider using Date type if you plan to manipulate dates
    contractType: string;
    phoneNumber: string;
    expirationDate: string;
    description: string;
  }