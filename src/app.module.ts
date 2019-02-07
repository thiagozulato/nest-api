import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config.MONGO_URL,
        useNewUrlParser: true
      })
    }),
    UserModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule {}
