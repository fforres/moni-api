import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountsModule } from './Accounts/accounts.module';
import { AuthorsModule } from './Authors/authors.module';

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
  ],
})
export class AppModule {}
