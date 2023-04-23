import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class AttendantMenuInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attendantId: number;

  @Column()
  userId: number;

  @Column()
  menuName: string;

  @Column()
  menuPrice: number;

  @Column()
  count: number;

  @Column()
  description: string;
}
