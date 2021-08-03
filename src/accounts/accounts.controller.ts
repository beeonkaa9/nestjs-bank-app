import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { Account } from './entities/accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  /*POST /accounts/
    Creates a specific account
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAccountDto: CreateAccountDto) {
    this.accountsService.create(createAccountDto);
  }

  /*POST /accounts/{accountId}/transations/add
    create a transaction to add money for a specific account
  */
  @Post()
  addMoney(): string {
    return 'a transaction added';
  }

  /*POST /accounts/{accountId}/transactions/withdraw
    create a transaction to remove money for a specific account
  */
  @Post()
  withdraw(): string {
    return 'withdrawal';
  }

  /*POST /accounts/{accountId}/transactions/send
    create a transaction to send money to a specific account
   */
  @Post()
  sendMoney(): string {
    return 'money to send to specific account';
  }

  /*GET /accounts/
    Retrieve a list of all accounts in the system
  */
  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  /*GET /accounts/id
    retreive a specific account by its id
  */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.accountsService.findOne(id)) {
      throw new NotFoundException('user id was not found');
    }
    return this.accountsService.findOne(id);
  }

  /*GET /accounts/{accountId}/transactions
    retreive a list of ALL transactions for a specific account
  */
  @Get()
  findAllforId(): string {
    return 'all transactions for an account';
  }
}
