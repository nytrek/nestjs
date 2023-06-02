import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      const { password, ...result } = user;
      const matched = await comparePassword(pass, password);
      if (matched) return result;
      else return null;
    }
    return null;
  }
}
