import { Controller, Get } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {
  /*GET /transactions
    get ALL transactions in ALL the system
  */
  @Get()
  findAll(): string {
    return 'all transactions for all accounts';
  }
}
