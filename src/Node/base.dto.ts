import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseDTO {
  @Field(_type => ID)
  readonly id: string;
}
