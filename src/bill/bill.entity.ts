import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attendants: string;

  @Column()
  total_price: number;

  @Column()
  bank_account: string;

  @Column()
  delivery_fee: number;

  @Column()
  createdAt: Date;
}
