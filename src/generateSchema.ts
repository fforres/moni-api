import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { AuthorsResolver } from './Authors/authors.resolver';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([AuthorsResolver]);
  console.log(JSON.stringify(schema, null, 2));
}

generateSchema();
