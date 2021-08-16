import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDefined,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class Balance {
  @IsDefined({
    message:
      'Balance amount must be included and should not be undefined or null',
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @IsDefined({
    message:
      'Balance currency must be included and should not be undefined or null',
  })
  @IsAlpha()
  currency: string;
}
export class CreateAccountDto {
  @IsDefined({
    message: 'id must be included and should not be undefined or null',
  })
  @IsUUID()
  id: string;

  @IsDefined({
    message: 'given_name must be included and should not be undefined or null',
  })
  @IsAlpha()
  given_name: string;

  @IsDefined({
    message: 'family_name must be included and should not be undefined or null',
  })
  @IsAlpha()
  family_name: string;

  @IsDefined({
    message:
      'email address must be included and should not be undefined or null',
  })
  @IsEmail()
  email_address: string;

  @IsDefined({
    message: 'note must be included and should not be undefined or null',
  })
  @IsString()
  note: string;

  @IsDefined({
    message: 'Balance must be included and should not be undefined or null',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  balance: Balance;
}
