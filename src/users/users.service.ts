import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Post } from 'src/posts/posts.entity';
import { PostType } from 'src/posts/post.type';

export type UserType = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Post) private postsRepository: Repository<Post>
    ) {}

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<UserType | undefined> {
        return this.users.find(user => user.username === username);
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['fullName', 'birthday', 'isActive'],
            where: [{ 'id': _id }]
        });
    }

    async updateUser(user: User) {
        return this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        return this.usersRepository.delete(user);
    }

    async createUserPost(_id: number, body: PostType) {
        const user = await this.usersRepository.findOneBy({ id: _id })
        if (!user) {
            throw new HttpException(
                'User not found. Cannot create post',
                HttpStatus.BAD_REQUEST
            )
        }
        const saved = this.postsRepository.create({ ...body, user })
        return await this.postsRepository.save(saved)
    }
}
