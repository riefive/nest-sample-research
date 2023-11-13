import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}