import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transactions.entity';
import { AccountsService } from 'src/accounts/accounts.service';
@Injectable()
export class TransactionsService {
  @Inject()
  protected accountsService: AccountsService;
  private readonly transactions: Transaction[] = [];

  findAllTransactions(): Transaction[] {
    return this.accountsService.transactionsArray;
  }
}
