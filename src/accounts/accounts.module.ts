import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from './accounts.entity';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsEntity])],
  providers: [AccountsService, AccountsResolver],
})
export class AccountsModule {}
