import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/accounts.entity';

//data storage and retrieval (in memory)
@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  create(createAccountDto: CreateAccountDto) {
    const newAccount = { ...createAccountDto };
    this.accounts.push(newAccount);
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(accountId: string) {
    return this.accounts.find((accounts) => accounts.id == accountId);
  }
}
