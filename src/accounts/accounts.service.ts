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
import { sendMoneyValidation } from './functions/sendMoneyLogic';

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
      throw new NotAcceptableException(
        'an account already exists for this id; cannot make duplicate accounts',
      );
    }
    this.accounts = [...this.accounts, { ...createAccountDto }];
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(accountId: string) {
    if (!this.accounts.find((accounts) => accounts.id === accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }
    return this.accounts.find((accounts) => accounts.id === accountId);
  }

  addMoney(createTransactionDto: CreateTransactionDto) {
    const accountId: string = createTransactionDto.id;

    if (!this.findOne(accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
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
        'not enough money in balance to make this withdrawal',
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

    //to perform the send; withdraw from sender and add to receiver
    const senderTransaction: CreateTransactionDto = {
      id: sendTransactionDto.id,
      note: sendTransactionDto.note,
      amount_money: sendTransactionDto.amount_money,
    };

    const targetTransaction: CreateTransactionDto = {
      id: sendTransactionDto.target_account_id,
      note: sendTransactionDto.note,
      amount_money: sendTransactionDto.amount_money,
    };

    if (!this.findOne(targetId) || !this.findOne(senderId)) {
      throw new NotFoundException(
        'either the target account id or the account id does not exist',
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
      this.withdraw(senderTransaction);
      this.addMoney(targetTransaction);
    } catch (e) {
      return 'something went wrong' + e.message;
    }

    this.transactions = [...this.transactions, { ...sendTransactionDto }];
  }

  deleteAccount(id: string) {
    this.accounts = this.accounts.filter((account) => account.id != id);
  }

  findAllforId(accountId: string) {
    if (!this.findOne(accountId)) {
      throw new NotFoundException('an account does not exist for this user id');
    }

    const transactionsOfId = this.transactions.filter(
      (transaction) => transaction.id === accountId,
    );

    return transactionsOfId;
  }
}
