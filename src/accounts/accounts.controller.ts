import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
    if (!id) {
      throw new BadRequestException('user id was not found');
    }
    return this.accountsService.findOne(id);
  }
}
