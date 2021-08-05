import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction-dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/accounts.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { exception } from 'console';

//data storage and retrieval (in memory)
@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];
  private readonly transactions: Transaction[] = [];

  get transactionsArray(): Transaction[] {
    return this.transactions;
  }

  //creates a new account
  create(createAccountDto: CreateAccountDto) {
    const newAccount = { ...createAccountDto };
    this.accounts.push(newAccount);
  }

  //returns all accounts
  findAll(): Account[] {
    return this.accounts;
  }

  //returns an account based on accountId
  findOne(accountId: string) {
    if (!this.accounts.find((accounts) => accounts.id == accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }
    return this.accounts.find((accounts) => accounts.id == accountId);
  }

  //creates a transaction to add money for a specific account
  addMoney(createTransactionDto: CreateTransactionDto) {
    if (!this.findOne(createTransactionDto.id)) {
      throw new NotFoundException("an account doesn't exist for this user id");
    }
    const newTransaction = { ...createTransactionDto };
    this.transactions.push(newTransaction);
  }

  //find all transactions for a specific id
  findAllforId(accountId: string) {
    return this.transactions.find(
      (transactions) => transactions.id == accountId,
    );
  }
}
