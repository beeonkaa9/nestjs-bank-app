interface Balance {
  amount: number;
  currency: string;
}
export interface Account {
  id: string;
  given_name: string;
  family_name: string;
  email_address: string;
  note: string;
  balance: Balance;
}
