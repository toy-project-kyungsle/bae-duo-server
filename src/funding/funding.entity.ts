import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { FundingStatus } from './funding.model';

@Entity()
export class Funding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  starter: string;

  @Column()
  brandId: number;

  @Column()
  brand: string;

  @Column()
  brandImage: string;

  @Column()
  minPrice: number;

  @Column()
  curPrice: number;

  @Column()
  minMember: number;

  @Column()
  curMember: number;

  @Column()
  deadline: Date;

  @Column()
  status: FundingStatus;

  @Column()
  menuImageIds: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string | null;
}
