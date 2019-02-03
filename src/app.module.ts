import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [{
    provide: 'Config',
    useFactory: () => ({
      app: '1.0.0.14322'
    })
  }],
  exports: ['Config']
})
export class AppModule {}
