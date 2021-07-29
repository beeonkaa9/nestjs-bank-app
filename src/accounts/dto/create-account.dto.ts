import { IsEmail, IsJSON, IsString, IsUUID } from 'class-validator';
export class CreateAccountDto {
  @IsUUID()
  id: string;

  @IsString()
  given_name: string;

  @IsString()
  family_name: string;

  @IsEmail()
  email_address: string;

  @IsString()
  note: string;

  @IsJSON()
  balance: Balance;
}

interface Balance {
  amount: number;
  currency: string;
}
