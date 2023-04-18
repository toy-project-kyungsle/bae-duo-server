import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Brands extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdId: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  orderType: number;

  @Column()
  orderCnt?: number;

  @Column()
  menuImage: string;

  @Column()
  defaultDeadLine?: string;

  @Column()
  defaultMinPrice?: number;
}
