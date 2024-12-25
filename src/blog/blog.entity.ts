import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  heading: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageurl: string;
}
