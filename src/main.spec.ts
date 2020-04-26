import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AccountsService } from './accounts/accounts.service';
import { AppModule } from './app.module';
import { AuthorsService } from './authors/authors.service';

describe('GraphQL with fastify', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AccountsService, AuthorsService],
    }).compile();

    app = module.createNestApplication(new FastifyAdapter());
    await app.init();

    await app
      .getHttpAdapter()
      .getInstance()
      .ready();
  });

  it(`should return query result`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `
        {
          author(id: "i") {
            id,
          }
        }`,
      })
      .expect(200, {
        data: {
          author: {
            id: 'i',
          },
        },
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
