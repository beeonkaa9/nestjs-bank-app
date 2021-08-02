import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class Balance {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsAlpha()
  currency: string;
}
export class CreateAccountDto {
  @IsUUID()
  id: string;

  @IsAlpha()
  given_name: string;

  @IsAlpha()
  family_name: string;

  @IsEmail()
  email_address: string;

  @IsString()
  note: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Balance)
  balance: Balance;
}
