import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountActivationEntity } from '../account-activation/account-activation.entity';
import { AccountsEntity } from '../accounts/accounts.entity';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    JwtModule.register({
      // TODO: (felipe) Change this onto env variable
      secret: 'SOME_PRIVATE_KEY',
    }),
    TypeOrmModule.forFeature([AccountsEntity, AccountActivationEntity]),
  ],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
