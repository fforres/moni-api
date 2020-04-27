import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivateAccountInput {
  @Field()
  readonly activationKey: string;
}
