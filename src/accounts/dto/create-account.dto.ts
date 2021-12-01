import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: 'number', example: '33' })
  amount: number;

  @IsDefined({
    message:
      'Balance currency must be included and should not be undefined or null',
  })
  @IsAlpha()
  @ApiProperty({ type: 'string', example: 'USD' })
  currency: string;
}
export class CreateAccountDto {
  @IsDefined({
    message: 'id must be included and should not be undefined or null',
  })
  @IsUUID()
  @ApiProperty({
    type: 'uuid',
    example: 'ccc3a91d-449c-41ff-a6fe-d79001431e4f',
  })
  id: string;

  @IsDefined({
    message: 'given_name must be included and should not be undefined or null',
  })
  @IsAlpha()
  @ApiProperty({ type: 'string', example: 'Jane' })
  given_name: string;

  @IsDefined({
    message: 'family_name must be included and should not be undefined or null',
  })
  @IsAlpha()
  @ApiProperty({ type: 'string', example: 'Johnson' })
  family_name: string;

  @IsDefined({
    message:
      'email address must be included and should not be undefined or null',
  })
  @IsEmail()
  @ApiProperty({ type: 'email', example: 'janejohn@webinator.com' })
  email_address: string;

  @IsDefined({
    message: 'note must be included and should not be undefined or null',
  })
  @IsString()
  @ApiProperty({ type: 'string', example: 'savings account' })
  note: string;

  @IsDefined({
    message: 'Balance must be included and should not be undefined or null',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  balance: Balance;
}
