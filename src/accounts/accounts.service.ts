import { Injectable } from '@nestjs/common';
import { Account } from './interfaces/account.interface';

//data storage and retrieval (in memory)
@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];
  private readonly account: Account['id'];

  create(account: Account) {
    this.accounts.push(account);
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(string): Account {
    return this.account['id'];
  }
}
