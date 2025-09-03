import { IsEmail, IsString, MaxLength, MinLength, minLength } from "class-validator"

export class LoginUserDto {

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string

}