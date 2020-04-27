import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationTokens } from './authentication.dto';
import { ActivateAccountInput } from './authentication.inputs';
import { AuthenticationService } from './authentication.service';

@Resolver(_of => AuthenticationTokens)
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation(_returns => AuthenticationTokens)
  async activateAccount(
    @Args('data')
    data: ActivateAccountInput,
  ) {
    return this.authenticationService.activateAccount(data);
  }
}
