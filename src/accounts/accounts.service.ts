import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction-dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/accounts.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { SendTransactionDto } from 'src/transactions/dto/send-transaction-dto';

//data storage and retrieval (in memory)
@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];
  private readonly transactions: Transaction[] = [];
  //@Inject()
  //protected transactionsService: TransactionsService;

  //getter to return transaction array to transactions service (for findAllTransactions)
  get transactionsArray(): Transaction[] {
    return this.transactions;
  }

  //creates a new account
  create(createAccountDto: CreateAccountDto) {
    const accountId: string = createAccountDto.id;
    if (this.accounts.find((accounts) => accounts.id == accountId)) {
      throw new NotAcceptableException(
        'an account already exists for this id; cannot make duplicate accounts',
      );
    }
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
    const accountId: string = createTransactionDto.id;

    if (!this.findOne(accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }

    const newTransaction = { ...createTransactionDto };
    this.transactions.push(newTransaction);

    //access account to add money
    const account: Account = this.findOne(accountId);
    account.balance.amount += newTransaction.amount_money.amount;
  }

  //creates a transaction to withdraw money for a specific account
  withdraw(createTransactionDto: CreateTransactionDto) {
    const accountId: string = createTransactionDto.id;

    if (!this.findOne(accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }

    const newTransaction = { ...createTransactionDto };
    this.transactions.push(newTransaction);

    //access account to subtract money
    const account: Account = this.findOne(accountId);
    if (account.balance.amount < newTransaction.amount_money.amount) {
      throw new NotAcceptableException(
        'not enough money in balance to make this withdrawal',
      );
    }
    account.balance.amount -= newTransaction.amount_money.amount;
  }

  //send money to another account
  sendMoney(sendTransactionDto: SendTransactionDto) {
    /*TODO: +ensure that money sent is between 1 and 1000
      +ensure that money sent cannot be more than balance
      +ensure that transaction goes through completely (error checking, promises(?), ACID principles)
    */
  }

  //find all transactions for a specific id
  findAllforId(accountId: string) {
    let transactionsForId: Transaction[] = [];
    for (const transaction of this.transactions) {
      if (transaction.id === accountId) {
        transactionsForId.push(transaction);
      }
    }
    return transactionsForId;
  }
}
