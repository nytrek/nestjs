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

  /**
   *
   * @param userDetails
   * @returns push method
   */
  createUser(userDetails: createUserType) {
    return this.fakeUsers.push(userDetails);
  }

  /**
   *
   * @returns a list of fake users
   */
  fetchUsers() {
    return this.fakeUsers;
  }

  /**
   *
   * @param id
   * @returns null to illustrate how to handle exception
   * @see getUserById
   */
  fetchUserById(id: number) {
    return null;
  }

  /**
   *
   * @param index
   * @param userDetails
   * @returns updated user
   */
  updateUserByIndex(index: number, userDetails: createUserType) {
    return (this.fakeUsers[index] = userDetails);
  }

  /**
   *
   * @param index
   * @returns deleted user
   */
  deleteUserByIndex(index: number) {
    return this.fakeUsers.splice(index, 1);
  }
}
