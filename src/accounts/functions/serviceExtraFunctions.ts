import { NotAcceptableException } from '@nestjs/common';

/*this function does all the checks for the following business rules:
  +ensure that money sent is between 1 and 1000
  +ensure that money sent cannot be more than balance
  +cannot send money if balance is zero
*/
export function sendMoneyValidation(amountToSend: number, balance: number) {
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
