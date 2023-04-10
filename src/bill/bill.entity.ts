import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attendants: string;

  @Column()
  minPrice: number;

  @Column()
  bankName: string;

  @Column()
  bankAccount: string;

  @Column()
  deliveryFee: number;

  @Column()
  createdAt: Date;
}
