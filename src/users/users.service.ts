import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

export type UserType = any;

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

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
            select: ["fullName", "birthday", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async updateUser(user: User) {
        return this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        return this.usersRepository.delete(user);
    }
}
