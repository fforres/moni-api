import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Subscription,
  Int,
  ID,
} from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorsService } from './authors.service';

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService, // private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => ID }) id: string) {
    return this.authorsService.findOneById(id);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
