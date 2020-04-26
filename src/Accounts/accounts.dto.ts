import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseDTO } from '../Node/base.dto';

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE', // Account cannot do anything.
  DISABLED = 'DISABLED',
  CREATED = 'CREATED', // Meaning: need email validation
}

registerEnumType(AccountStatus, {
  name: 'AccountStatus',
  description: 'The different states an account can be in',
});

@ObjectType()
export class Account extends BaseDTO {
  @Field()
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field(_type => AccountStatus)
  status: string;
}
