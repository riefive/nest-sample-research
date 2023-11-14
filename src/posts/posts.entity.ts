import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    title: string;

    @Column({ length: 100 }) 
    description: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn()
    user: User
}