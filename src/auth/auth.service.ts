import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {


  createUser(createUserDto: CreateUserDto) {

    const { email, name, password } = createUserDto

    return `usuario ${name} creado :)`

  }

  loginUser(loginUserDto: LoginUserDto) { 

    return `usuario ${loginUserDto.name} logeado :)`
  }

}
