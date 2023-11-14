import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { Post } from 'src/posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
