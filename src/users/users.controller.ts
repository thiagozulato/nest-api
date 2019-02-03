import { Controller, Get, Param, Inject } from '@nestjs/common';
import { getPackedSettings } from 'http2';

interface User {
  id: number,
  name: string,
}

const userSource: User[] = [];

for (let index = 0; index < 30; index++) {
  userSource.push({
    id: index,
    name: `User ${index}`
  })
}

@Controller('v1/users')
export class UsersController {
  private readonly users: User[] = userSource; 

  constructor(@Inject('Config') private readonly config: any) {}

  @Get()
  getAll() {
    return this.users;
  }

  @Get('config')
  getConfig() {
    return this.config;
  }

  @Get('settings')
  getSettings() {
    return 'ok';
  }
  
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.users.find(u => u.id == id);
  }
}
