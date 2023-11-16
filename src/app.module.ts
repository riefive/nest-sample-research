import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './books/book.module';
import { MovieModule } from './movies/movie.module';
import { CatsModule } from './cats/cats.module';
import { User } from './users/users.entity'
import { Post } from './posts/posts.entity';
import { dbConfig } from '../ormconfig';
import { PaymentController } from './payment/payment.controller';

const isLazy = false
const customModules = isLazy ? [] : [BookModule, MovieModule]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ 
      ...dbConfig, 
      entities: [User, Post],
      synchronize: true
    }), 
    AuthModule,
    UsersModule,
    CatsModule
  ].concat(customModules),
  controllers: [AppController, PaymentController],
  providers: [AppService],
})
export class AppModule {}
