import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Attendant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fundingId: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  menuInfo: string;

  @Column()
  hasPaid: boolean;

  @Column()
  createdAt: Date;
}
