import { AccountsModule } from './Accounts/accounts.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorsModule } from './Authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
