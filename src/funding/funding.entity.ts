import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { FundingStatus } from './funding.model';

@Entity()
export class Funding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  starter: string;

  @Column()
  brand: string;

  @Column()
  total_price: number;

  @Column()
  cur_price: number;

  @Column()
  min_member: number;

  @Column()
  cur_member: number;

  @Column()
  deadline: Date;

  @Column()
  status: FundingStatus;
}
