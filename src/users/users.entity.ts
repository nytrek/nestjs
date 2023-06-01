import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Status {
  Approved = 'Approved',
  Pending = 'Pending',
  Denied = 'Denied',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  status: Status;

  @Column()
  age: number;

  @Column()
  address: string;
}
