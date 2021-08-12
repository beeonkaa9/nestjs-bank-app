import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { SendMoneyLogic } from './functions/sendMoneyLogic';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, SendMoneyLogic],
  exports: [AccountsService],
})
export class AccountsModule {}
