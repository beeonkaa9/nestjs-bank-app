import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Balance } from 'src/accounts/dto/create-account.dto';

export class SendTransactionDto {
  @ApiProperty()
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID()
  target_account_id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  note: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  amount_money: Balance;
}
