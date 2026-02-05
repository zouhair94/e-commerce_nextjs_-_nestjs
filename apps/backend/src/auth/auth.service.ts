/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '@prisma/client';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User, response: Response) {
    const expires = new Date();
    const expiresInMs = ms(this.configService.getOrThrow('JWT_EXPIRES_IN'));
    expires.setMilliseconds(expires.getMilliseconds() + parseInt(expiresInMs));
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const token = await this.jwtService.signAsync(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires,
    });
    return { tokenPayload };
  }
}
