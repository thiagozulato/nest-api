import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() auth: AuthDto) {
    try {
      return await this.authService.login(auth);
    }
    catch (error) {
      throw new BadRequestException('Login Error', error.message);
    }
  }
}
