import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountActivationModule } from './account-activation/account-activation.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // TODO: Disable debug on prod
      debug: true,
      // TODO: Disable playground on prod
      playground: true,
    }),
    AccountsModule,
    AuthorsModule,
    AccountActivationModule,
  ],
})
export class AppModule {}
