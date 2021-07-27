export interface Account {
  id: uuid;
  given_name: string;
  family_name: string;
  email_address: string;
  note: string;
  balance: JSON;
}
