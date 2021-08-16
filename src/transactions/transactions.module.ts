import { Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [AccountsModule],
})
export class TransactionsModule {}
