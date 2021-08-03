import { Balance } from 'src/accounts/dto/create-account.dto';

export class Transaction {
  id: string;
  target_account_id?: string;
  note: string;
  amount_money: Balance;
  account_id?: string;
}
