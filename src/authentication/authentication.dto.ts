import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationTokens {
  @Field()
  authenticationToken: string;

  @Field()
  refreshToken: string;
}
