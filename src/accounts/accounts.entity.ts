import { IsEmail, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../node/base.entity';
import { AccountStatus } from './accounts.dto';

@Entity('account')
export class AccountsEntity extends BaseEntity {
  @Column('varchar', { length: 500, unique: true })
  @IsEmail()
  @Length(6, 500)
  email: string;

  @Column('varchar', { length: 100, nullable: true })
  @Length(10, 100)
  username: string;

  @Column('varchar', { length: 500, default: AccountStatus.CREATED })
  status: AccountStatus;

  @Column('varchar', { length: 500, nullable: true })
  @Length(10, 100)
  activationKey: string;
}
