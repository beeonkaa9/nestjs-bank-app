import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/accounts.entity';
import {
  sendTransaction,
  Transaction,
} from 'src/transactions/entities/transactions.entity';
import { SendTransactionDto } from 'src/transactions/dto/send-transaction.dto';
import { sendMoneyValidation } from './utils/sendMoneyLogic';

//data storage and retrieval (in memory)
@Injectable()
export class AccountsService {
  accounts: Account[] = [];
  transactions: (Transaction | sendTransaction)[] = [];

  //getter to return transaction array to transactions service (for findAllTransactions)
  get transactionsArray(): Transaction[] {
    return this.transactions;
  }

  create(createAccountDto: CreateAccountDto) {
    const accountId: string = createAccountDto.id;
    if (this.accounts.find((accounts) => accounts.id === accountId)) {
      throw new NotAcceptableException('An account already exists for this id');
    }
    this.accounts = [...this.accounts, { ...createAccountDto }];
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(accountId: string) {
    if (!this.accounts.find((accounts) => accounts.id === accountId)) {
      throw new NotFoundException('An account does not exist for this user id');
    }
    return this.accounts.find((accounts) => accounts.id === accountId);
  }

  addMoney(createTransactionDto: CreateTransactionDto) {
    const accountId: string = createTransactionDto.id;

    if (!this.findOne(accountId)) {
      throw new NotFoundException('An account does not exist for this user id');
    }

    this.transactions = [...this.transactions, { ...createTransactionDto }];

    //access account to add money
    const account: Account = this.findOne(accountId);
    account.balance.amount += createTransactionDto.amount_money.amount;
  }

  withdraw(createTransactionDto: CreateTransactionDto) {
    const accountId: string = createTransactionDto.id;

    if (!this.findOne(accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }

    this.transactions = [...this.transactions, { ...createTransactionDto }];

    //access account to subtract money
    const account: Account = this.findOne(accountId);
    if (account.balance.amount < createTransactionDto.amount_money.amount) {
      throw new NotAcceptableException(
        'Not enough money in balance to make this withdrawal',
      );
    }
    account.balance.amount -= createTransactionDto.amount_money.amount;
  }

  sendMoney(sendTransactionDto: SendTransactionDto) {
    const senderId: string = sendTransactionDto.id;
    const targetId: string = sendTransactionDto.target_account_id;

    //for the validation checks on the sender account's balance and amount to be sent
    const amountToSend: number = sendTransactionDto.amount_money.amount;
    const senderBalance: number = this.findOne(senderId).balance.amount;

    if (!this.findOne(targetId) || !this.findOne(senderId)) {
      throw new NotFoundException(
        'Either the target account id or the account id does not exist',
      );
    }

    /*
      does all the checks for the following business rules:
        ensure that money sent is between 1 and 1000
        ensure that money sent cannot be more than balance
        cannot send money if balance is zero
    */
    sendMoneyValidation(amountToSend, senderBalance);

    //make sure transaction goes through completely
    try {
      //make the withdrawal from sender
      const senderAccount: Account = this.findOne(senderId);
      senderAccount.balance.amount -= amountToSend;

      //add money to target account
      const targetAccount: Account = this.findOne(targetId);
      targetAccount.balance.amount += amountToSend;
    } catch (e) {
      return 'Something went wrong:' + e.message;
    }

    this.transactions = [...this.transactions, { ...sendTransactionDto }];
  }

  deleteAccount(accountId: string) {
    if (!this.findOne(accountId)) {
      throw new NotFoundException('An account does not exist for this user id');
    }

    const account: Account = this.findOne(accountId);
    if (account.balance.amount != 0) {
      throw new NotAcceptableException(
        'Cannot delete account when balance is not zero',
      );
    }
    this.accounts = this.accounts.filter((account) => account.id != accountId);
  }

  findAllforId(accountId: string) {
    if (!this.findOne(accountId)) {
      throw new NotFoundException('An account does not exist for this user id');
    }

    const transactionsOfId = this.transactions.filter(
      (transaction) => transaction.id === accountId,
    );

    return transactionsOfId;
  }
}
