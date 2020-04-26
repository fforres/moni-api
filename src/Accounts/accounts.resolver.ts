import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { Account } from './accounts.dto';
import { AccountsService } from './accounts.service';
import {
  CreateAccountInput,
  UpdateAccountInput,
  RemoveAccountInput,
  UnremoveAccountInput,
} from './accounts.inputs';

@Resolver(of => Account)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService, // private postsService: PostsService,
  ) {}

  @Query(returns => Account)
  async account(
    @Args('id', { type: () => String })
    id: string,
  ) {
    if (id) {
      return this.accountsService.getById(id);
    }
  }

  @Mutation(returns => Account)
  async createAccount(
    @Args('data')
    data: CreateAccountInput,
  ) {
    return this.accountsService.createAccount(data);
  }

  @Mutation(returns => Account)
  async updateAccount(
    @Args('data')
    data: UpdateAccountInput,
  ) {
    return this.accountsService.updateAccount(data);
  }

  @Mutation(returns => Account)
  async removeAccount(
    @Args('data')
    data: RemoveAccountInput,
  ) {
    return this.accountsService.removeAccount(data);
  }
  @Mutation(returns => Account)
  async unremoveAccount(
    @Args('data')
    data: UnremoveAccountInput,
  ) {
    return this.accountsService.unremoveAccount(data);
  }
}
