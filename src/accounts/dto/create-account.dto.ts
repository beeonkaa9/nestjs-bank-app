import {
  isAlpha,
  IsAlpha,
  IsEmail,
  IsInstance,
  isInt,
  IsJSON,
  IsString,
  IsUUID,
} from 'class-validator';

import { Type } from 'class-transformer';

export class Balance {
  amount: number;
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

  @IsJSON()
  balance: Balance;
}
