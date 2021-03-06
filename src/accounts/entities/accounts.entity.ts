export class Account {
  id: string;
  given_name: string;
  family_name: string;
  email_address: string;
  note: string;
  balance: Balance;
}

export class Balance {
  amount: number;
  currency: string;
}
