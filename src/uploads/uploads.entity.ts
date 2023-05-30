import { Funding } from 'src/funding/funding.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
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

  // @ManyToOne(() => Funding)
  // @JoinColumn({ name: 'funding_id' })
  // funding: Funding;
}
