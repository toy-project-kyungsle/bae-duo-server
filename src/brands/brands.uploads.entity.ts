import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Uploads extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdId: string;

  @Column()
  name: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column()
  url: string;
}
