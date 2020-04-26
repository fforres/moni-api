import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field()
  readonly email: string;
}

@InputType()
class AccountInputById {
  @Field()
  readonly id: string;
}
@InputType()
export class UpdateAccountInput extends AccountInputById {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;
}

@InputType()
export class RemoveAccountInput extends AccountInputById {}

@InputType()
export class UnremoveAccountInput extends AccountInputById {}
