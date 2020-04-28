import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import * as ormConfig from '../ormconfig';
import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorsModule } from './authors/authors.module';

describe('GraphQL with fastify', () => {
  let app: INestApplication;
  let module = null;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...ormConfig,
          entities: ['./src/**/*.entity.ts'],
          synchronize: false,
        }),
        AuthenticationModule,
        AccountsModule,
        AuthorsModule,
      ],
    }).compile();

    app = module.createNestApplication(new FastifyAdapter());
    await app.init();

    await app
      .getHttpAdapter()
      .getInstance()
      .ready();
  });

  it(`should return query result`, () => {
    console.log({ app });
    console.log(app.getHttpAdapter());
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `
          query {
            meta {
              version
            }
          }
        `,
      })
      .expect(200, {
        data: {
          meta: {
            version: '1.0.0',
          },
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
