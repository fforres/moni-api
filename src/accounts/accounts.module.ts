import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountActivationEntity } from '../account-activation/account-activation.entity';
import { AccountsEntity } from './accounts.entity';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountsEntity, AccountActivationEntity]),
  ],
  providers: [AccountsService, AccountsResolver],
})
export class AccountsModule {}
