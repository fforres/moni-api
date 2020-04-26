import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Post } from './post';

@ObjectType()
export class Author {
  @Field(type => ID)
  id: string;
  firstName?: string;
  lastName?: string;
  // posts: Post[];
}
