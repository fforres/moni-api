import { Length } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { AccountsEntity } from '../accounts/accounts.entity';
import { BaseEntity } from '../node/base.entity';

@Entity('account-activation')
export class AccountActivationEntity extends BaseEntity {
  @OneToOne(
    _type => AccountsEntity,
    account => account.accountActivation,
  )
  account: AccountsEntity;

  @Column('varchar', { length: 100 })
  @Length(10, 100)
  activationKey: string;

  @Column({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP + interval '1 day'",
  })
  @Length(10, 100)
  TTL: Date;
}
