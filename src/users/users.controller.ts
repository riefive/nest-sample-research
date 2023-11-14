import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { PostType } from 'src/posts/post.type';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    get() {
        return this.service.getUsers();
    }

    @Get(':id')
    getOne(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Post(':id/post')
    createPost(@Param('id') id: number, @Body() post: PostType) {
        return this.service.createUserPost(id, post);
    }

    @Put()
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}