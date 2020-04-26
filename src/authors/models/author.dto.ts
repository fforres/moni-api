import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '../../node/base.dto';
// import { Post } from './post';

@ObjectType()
export class Author extends BaseDTO {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  // posts: Post[];
}
