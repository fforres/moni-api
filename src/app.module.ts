import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorsModule } from './Authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // TODO: Disable debug on prod
      debug: true,
      // TODO: Disable playground on prod
      playground: true,
    }),
  ],
})
export class AppModule {}
