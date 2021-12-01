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
  @ApiProperty({
    type: 'uuid',
    example: '9e28507a-632f-44a6-99a7-98695cf2adcf',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({
    type: 'uuid',
    example: 'ccc3a91d-449c-41ff-a6fe-d79001431e4f',
  })
  @IsDefined()
  @IsUUID()
  target_account_id: string;

  @ApiProperty({ type: 'string', example: 'birthday gift' })
  @IsDefined()
  @IsString()
  note: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  amount_money: Balance;
}
