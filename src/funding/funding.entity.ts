import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { FundingStatus } from './funding.model';

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
  deadline: Date;

  @Column()
  min_member: number;

  @Column()
  status: FundingStatus;
}
