import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwtpayload.model';
import { AuthDto } from './auth.dto';
import { User } from 'src/users/user.model';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UsersService) {}

  async login(auth: AuthDto): Promise<{
    expires: any,
    token: string,
  }> {
    const user = await this.userService.getUserByEmail(auth.email);
    const isValidPassword = await compare(auth.password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid user credentials');
    }

    const jwt: JwtPayload = {
      email: user.email,
      id: user.id
    };

    return {
      expires: 3600,
      token: this.jwtService.sign(jwt)
    }
  }

  async validateUser(jwtPayload: JwtPayload): Promise<User> {
    return await this.userService.getUserByEmail(jwtPayload.email);
  }
}
