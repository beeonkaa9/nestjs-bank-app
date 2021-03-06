import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { Account } from './entities/accounts.entity';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { SendTransactionDto } from 'src/transactions/dto/send-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  /*
    POST /accounts/
    Creates a specific account
   */
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    this.accountsService.create(createAccountDto);
  }

  /*
    POST /accounts/{accountId}/transactions/add
    create a transaction to add money for a specific account
  */
  @Post(':accountId/transactions/add')
  addMoney(@Body() createTransactionDto: CreateTransactionDto) {
    this.accountsService.addMoney(createTransactionDto);
  }

  /*
    POST /accounts/{accountId}/transactions/withdraw
    create a transaction to remove money for a specific account
  */
  @Post(':accountId/transactions/withdraw')
  withdraw(@Body() createTransactionDto: CreateTransactionDto) {
    this.accountsService.withdraw(createTransactionDto);
  }

  /*
    POST /accounts/{accountId}/transactions/send
    create a transaction to send money to a specific account
   */
  @Post(':accountId/transactions/send')
  sendMoney(@Body() sendTransactionDto: SendTransactionDto) {
    return this.accountsService.sendMoney(sendTransactionDto);
  }

  /*
    GET /accounts/
    Retrieve a list of all accounts in the system
  */
  @Get()
  findAll(): Account[] {
    return this.accountsService.findAll();
  }

  /*
    GET /accounts/id
    retreive a specific account by its id
  */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Account {
    return this.accountsService.findOne(id);
  }

  /*
    DELETE /accounts/
    Deletes a specific account
   */
  @Delete(':id')
  deleteAccount(@Param('id') id: string) {
    return this.accountsService.deleteAccount(id);
  }

  /*
    GET /accounts/{accountId}/transactions
    retreive a list of ALL transactions for a specific account
  */
  @Get(':accountId/transactions')
  findAllforId(
    @Param('accountId', ParseUUIDPipe) accountId: string,
  ): Transaction[] {
    return this.accountsService.findAllforId(accountId);
  }
}
