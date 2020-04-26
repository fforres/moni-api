import { AuthorsService } from './Authors/authors.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AccountsService } from './Accounts/accounts.service';

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
