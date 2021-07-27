import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return 'creates a new account';
  }
  //GET all accounts
  @Get()
  getAccounts(): any {
    return [{ id: 0 }];
  }

  //GET account by id
  @Get(':id')
  getAccountByID(@Param('id') id: string): string {
    console.log(id);
    return ':id';
  }
}
