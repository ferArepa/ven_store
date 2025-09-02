import { IsEmail, IsString, Min, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @IsEmail()
  email: string

  @MinLength(8)
  @IsString()
  password: string

}
