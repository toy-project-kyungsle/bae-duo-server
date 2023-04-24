import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Attendant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fundingId: number;
  userId: number;
  userName: string;
  hasPaid: boolean;
  createdAt: string;
  menuInfo?: any;
}
