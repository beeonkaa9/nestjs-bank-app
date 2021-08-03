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

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAccountDto: CreateAccountDto) {
    this.accountsService.create(createAccountDto);
  }

  //GET all accounts
  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  //GET account by id
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.accountsService.findOne(id)) {
      throw new NotFoundException('user id was not found');
    }
    return this.accountsService.findOne(id);
  }
}
