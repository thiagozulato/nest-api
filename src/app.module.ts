import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './users/user.module';
import { config } from './config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config.MONGO_URL,
        useNewUrlParser: true
      })
    }),
    UserModule
  ],
  providers: [],
})
export class AppModule {}
