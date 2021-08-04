import { Type } from 'class-transformer';
import {
  IsDefined,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Balance } from 'src/accounts/dto/create-account.dto';

export class CreateTransactionDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsUUID()
  target_account_id: string;

  @IsDefined()
  @IsString()
  note: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  amount_money: Balance;
}
