import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './@auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { JwtModule } from './@jwt/jwt.module';

import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { Post } from './posts/entities/post.entity';

import { JwtMiddleware } from './@jwt/jwt.middleware';
import { MailModule } from './@mail/mail.module';
import * as Joi from 'joi';
import { Category } from './posts/entities/category.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    // 스키마, 즉 정의된 명세서에 담긴 구성요소를 조이를 통해 유효성 검사가 가능하다.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    // type orm을 불러오고, 여기 dotenv를 사용해 환경에 따른 설정을 한다.
    // 네스트의 모듈 config module을 사용하여 환경설정 파일을 설정할 수 있다.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User, Verification, Post, Category],
    }),
    GraphQLModule.forRoot({
      // code first : 따로 저장하지 않는 방법.
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    AuthModule,
    JwtModule.forRoot({
      secretKey: process.env.SECRET_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    CommonModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
