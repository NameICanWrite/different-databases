import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'default title'})
  title: string;

  @Column({default: 'default description'})
  description: string;

  @Column()
  cover: string;
}