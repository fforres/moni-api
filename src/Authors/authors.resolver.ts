import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.dto';

@Resolver(_of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService, // private postsService: PostsService,
  ) {}

  @Query(_returns => Author)
  async author(@Args('id', { type: () => ID }) id: string) {
    return this.authorsService.findOneById(id);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
