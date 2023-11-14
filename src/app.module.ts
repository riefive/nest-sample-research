import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsController } from './cats/cats.controller';
import { User } from './users/users.entity'
import { Post } from './posts/posts.entity';
import { dbConfig } from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      ...dbConfig, 
      entities: [User, Post],
      synchronize: true
    }), 
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
