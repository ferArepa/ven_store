import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({

    type: 'mysql',
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: +process.env.MYSQL_PORT!,
    username: process.env.MYSQL_USERNAME,
    synchronize: true,
    autoLoadEntities: true

  }),
    ProductsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
