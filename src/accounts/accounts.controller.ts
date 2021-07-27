import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { Account } from './interfaces/account.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    this.accountsService.create(createAccountDto);
  }

  //GET all accounts
  @Get()
  findAll(): Account[] {
    return this.accountsService.findAll();
  }

  //GET account by id
  @Get(':id')
  getAccountByID(@Param('id') id: string): string {
    console.log(id);
    return ':id';
  }
}
