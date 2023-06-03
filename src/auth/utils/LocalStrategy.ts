import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/users.entity';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = (await this.authService.validateUser(
      username,
      password,
    )) as User;
    if (!user || user.status !== 'Approved') {
      throw new UnauthorizedException();
    }
    return user;
  }
}
