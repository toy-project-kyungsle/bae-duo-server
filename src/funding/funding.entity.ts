import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FundingStatus } from './funding.model';
import { Brands } from 'src/brands/brands.entity';
import { User } from 'src/user/user.entity';
import { Uploads } from 'src/uploads/uploads.entity';

@Entity()
export class Funding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  starterId: number;

  // @Column()
  // starter: string;

  @Column()
  brandId: number;

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
  createdAt: Date;

  @ManyToOne((type) => Brands, (brands) => brands.id)
  @JoinColumn({ name: 'brandId' })
  brands: Brands;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'starterId' })
  user: User;

  @OneToMany((type) => Uploads, (relation) => relation.funding)
  uploads: Uploads[];
}
