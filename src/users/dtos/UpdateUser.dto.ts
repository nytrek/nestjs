import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

enum Status {
  Approved = 'Approved',
  Pending = 'Pending',
  Denied = 'Denied',
}

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  address: string;

  password: string | undefined;
}
