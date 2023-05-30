import { Funding } from 'src/funding/funding.entity';
import { Uploads } from 'src/uploads/uploads.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Brands extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdUserId: number;

  @Column()
  name: string;

  @Column()
  orderType: number;

  @Column()
  orderCnt: number;

  @Column()
  imageId?: number;

  @Column()
  defaultDeadLine?: Date;

  @Column()
  defaultMinPrice?: number;

  @Column()
  defaultMinMember?: number;

  @Column()
  createdAt: string;

  @Column()
  isDeleted: number;

  @OneToOne(() => Uploads)
  @JoinColumn({ name: 'imageId' })
  uploads: Uploads;
}
