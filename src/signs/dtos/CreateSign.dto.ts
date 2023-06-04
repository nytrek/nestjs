import { IsNotEmpty } from 'class-validator';

export class CreateSignDto {
  @IsNotEmpty()
  orderRef: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  hintCode: string;
}
