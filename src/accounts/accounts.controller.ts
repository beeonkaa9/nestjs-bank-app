import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Post()
  create(): any {
    //todo
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
