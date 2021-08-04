import { Balance } from 'src/accounts/dto/create-account.dto';

export class Transaction {
  id: string;
  note: string;
  amount_money: Balance;
}

export class sendTransaction extends Transaction {
  target_account_id: string;
}
