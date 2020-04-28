import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorsModule } from './authors/authors.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // TODO: Disable debug on prod
      debug: true,
      // TODO: Disable playground on prod
      playground: true,
      context: ({ req }) => ({ req }), // <------ HERE
    }),
    MetaModule,
    AuthenticationModule,
    AccountsModule,
    AuthorsModule,
  ],
})
export class AppModule {}
