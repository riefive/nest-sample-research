import { Entity, Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/posts.entity'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    fullName: string;

    @Column('date') 
    birthday: Date;

    @Column() 
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn()
    posts: Post[]
}