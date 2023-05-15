import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Brands extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createduserId: number;

  @Column()
  name: string;

  @Column()
  orderType: number;

  @Column()
  orderCnt: number;

  @Column()
  brandImage: string;

  @Column()
  defaultDeadLine?: string;

  @Column()
  defaultMinPrice?: number;

  @Column()
  defaultMinMember?: number;

  @Column()
  createdAt: string;
}

class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdId: number;
}
