import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transactions.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  /*GET /transactions
    get ALL transactions in ALL the system
  */
  @Get()
  findAllTransactions(): Transaction[] {
    return this.transactionsService.findAllTransactions();
  }
}
