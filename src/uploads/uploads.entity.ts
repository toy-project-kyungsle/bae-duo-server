import { Brands } from 'src/brands/brands.entity';
import { Funding } from 'src/funding/funding.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

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

  @Column()
  fundingId: number;

  @ManyToOne(() => Funding, (funding) => funding.id)
  @JoinColumn({ name: 'fundingId', referencedColumnName: 'id' })
  funding: Funding;
}
