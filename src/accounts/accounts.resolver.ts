import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './accounts.dto';
import {
  CreateAccountInput,
  RemoveAccountInput,
  UnremoveAccountInput,
  UpdateAccountInput,
} from './accounts.inputs';
import { AccountsService } from './accounts.service';

@Resolver(_of => Account)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(_returns => Account)
  async account(
    @Args('id', { type: () => String })
    id: string,
  ) {
    if (id) {
      return this.accountsService.getById(id);
    }
  }

  @Mutation(_returns => Account)
  async createAccount(
    @Args('data')
    data: CreateAccountInput,
  ) {
    return this.accountsService.createAccount(data);
  }

  @Mutation(_returns => Account)
  async updateAccount(
    @Args('data')
    data: UpdateAccountInput,
  ) {
    return this.accountsService.updateAccount(data);
  }

  @Mutation(_returns => Account)
  async removeAccount(
    @Args('data')
    data: RemoveAccountInput,
  ) {
    return this.accountsService.removeAccount(data);
  }

  @Mutation(_returns => Account)
  async unremoveAccount(
    @Args('data')
    data: UnremoveAccountInput,
  ) {
    return this.accountsService.unremoveAccount(data);
  }
}
