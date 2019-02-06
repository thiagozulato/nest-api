import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import { config } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
