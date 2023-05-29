import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FundingStatus } from './funding.model';
import { Brands } from 'src/brands/brands.entity';

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
  description: string | null;

  @Column()
  menuImageIds: string;

  @Column()
  createdAt: Date;

  @ManyToOne((type) => Brands, (brands) => brands.id)
  brands: Brands;

  @JoinColumn({ name: 'brandId' })
  funding: Funding;
}
