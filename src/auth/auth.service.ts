import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { HttpStatusCode } from 'axios';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {

    if (this.configService.get("BCRYPT_SALT") === '')
      throw new Error('Falta la variable de entorno BCRYPT_SALT')

    const { email, name, password } = createUserDto

    const hashedPassword = bcrypt.hashSync(password, +this.configService.get("BCRYPT_SALT")!)

    try {

      const createdUser = this.userRepository.create({
        email,
        name,
        password: hashedPassword
      })

      await this.userRepository.save(createdUser)

      return {
        ...createdUser,
        token: this.generatejwt({ email })
      }

    } catch (error) {
      this.handleError(error)
    }
  }

  generatejwt(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }


  async loginUser(loginUserDto: LoginUserDto) {

    try {
      const { email, password } = loginUserDto

      const usuario = await this.userRepository.findOne({
        where: { email },
        select: { email: true, name: true, password: true }
      })
      if (!usuario)
        throw ("el usuario no existe")


      bcrypt.compareSync(password, usuario.password)

      HttpStatusCode.Ok
      return {token: this.generatejwt({email})}

    } catch (error) {
      this.handleError(error)
    }
  }


  handleError(error: any): never {
    throw new InternalServerErrorException('Ha ocurrido un error')
  }

}
