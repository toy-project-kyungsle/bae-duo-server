import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class AttendantEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fundingId: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  hasPaid: boolean;

  @Column()
  createdAt: Date;
}
