import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction-dto';
import { SendTransactionDto } from 'src/transactions/dto/send-transaction-dto';
import { AccountsService } from '../accounts.service';

/*this function does all the checks for the following business rules:
  +ensure that money sent is between 1 and 1000
  +ensure that money sent cannot be more than balance
  +cannot send money if balance is zero
*/
@Injectable()
export class SendMoneyLogic {
  constructor(
    @Inject(forwardRef(() => AccountsService))
    private accountsService: AccountsService,
  ) {}

  sendMoneyValidation(amountToSend: number, balance: number) {
    if (amountToSend < 1 || amountToSend > 1000) {
      throw new NotAcceptableException(
        'amount in amount_money is less than 1 or more than 1000',
      );
    } else if (balance === 0) {
      throw new NotAcceptableException('cannot send money; balance is zero');
    } else if (balance < amountToSend && balance != 0) {
      throw new NotAcceptableException(
        'amount in amount_money is larger than balance available',
      );
    }
  }

  withdrawFromSender(sendTransactionDto: SendTransactionDto) {
    //const amountToSend: number = sendTransactionDto.amount_money.amount;
    const withdrawTransaction: CreateTransactionDto = {
      id: sendTransactionDto.id,
      note: sendTransactionDto.note,
      amount_money: sendTransactionDto.amount_money,
    };

    const withdrawPromise = new Promise((resolve, reject) => {
      resolve(this.accountsService.withdraw(withdrawTransaction));
    });
    return withdrawPromise;
  }
}

//export async function addToTarget(targetId: string);
