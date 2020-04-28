import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field()
  version?: string;
}
