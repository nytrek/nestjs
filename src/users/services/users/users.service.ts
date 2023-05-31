import { Injectable } from '@nestjs/common';
import { createUserType } from '../../../utils/types';

@Injectable()
export class UsersService {
  /**
   * Business logic
   */
  private fakeUsers = [
    {
      username: 'Kenny',
      email: 'kennytran.dev@outlook.com',
    },
  ];
  createUser(userDetails: createUserType) {
    return this.fakeUsers.push(userDetails);
  }
  fetchUsers() {
    return this.fakeUsers;
  }
  fetchUserById(id: number) {
    return null;
  }
}
