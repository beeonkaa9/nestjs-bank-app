import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transactions.entity';
@Injectable()
export class TransactionsService {
  private readonly transactions: Transaction[] = [];

  findAllTransactions(): Transaction[] {
    return this.transactions;
  }
}
