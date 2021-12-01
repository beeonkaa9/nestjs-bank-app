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

export class CreateTransactionDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    type: 'uuid',
    example: '9e28507a-632f-44a6-99a7-98695cf2adcf',
  })
  id: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ type: 'string', example: 'rent money' })
  note: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Balance)
  amount_money: Balance;
}
