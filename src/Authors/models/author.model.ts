import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Post } from './post';

@ObjectType()
export class Author {
  @Field(type => ID)
  id: string;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  // posts: Post[];
}
