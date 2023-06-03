import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { encodePassword } from '../../../utils/bcrypt';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { User } from '../../users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        status: true,
        age: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        status: true,
        age: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...payload } = createUserDto;
    const hashedPass = await encodePassword(password);
    return this.userRepository.save({
      ...payload,
      password: hashedPass,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const { password, ...payload } = updateUserDto;

    return await this.userRepository.update(
      { id: userId },
      {
        ...payload,
        password: password ? await encodePassword(password) : undefined,
        updatedAt: new Date(),
      },
    );
  }

  deleteUser(userId: number): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
