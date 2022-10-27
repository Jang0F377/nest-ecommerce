import { IsEmail, IsNotEmpty } from 'class-validator';

export class Credentials {
  @IsEmail({
    message: 'Must be a valid email string',
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty!' })
  password: string;
}
