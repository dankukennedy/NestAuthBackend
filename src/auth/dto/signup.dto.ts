import { IsEmail, IsNotEmpty, IsString, Matches,MinLength} from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, { message: 'Password must be at least 8 characters long and contain at least one letter and one number', })
  password: string;
}