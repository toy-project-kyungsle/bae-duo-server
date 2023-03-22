import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Attendant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  user_name: string;

  @Column()
  menu_price: number;

  @Column()
  has_paid: boolean;

  @Column()
  createdAt: Date;
}
