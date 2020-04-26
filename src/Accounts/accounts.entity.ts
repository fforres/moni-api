import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../Node/base.entity';
import { AccountStatus } from './accounts.dto';

@Entity('account')
export class AccountsEntity extends BaseEntity {
  @Column('varchar', { length: 500, unique: true })
  email: string;

  @Column('varchar', { length: 100, unique: true, nullable: true })
  username: string;

  @Column('varchar', { length: 500, default: AccountStatus.CREATED })
  status: AccountStatus;
}
