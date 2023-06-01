import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //loads the env variables which are used in the TypeOrmModule config
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
