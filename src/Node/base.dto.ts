import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseDTO {
  @Field(type => ID)
  readonly id: string;
}
