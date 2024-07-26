import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  accountExternalIdDebit: string;

  @IsString()
  accountExternalIdCredit: string;

  @IsNumber()
  tranferTypeId: number;

  @IsNumber()
  @IsPositive()
  value: number;
}
