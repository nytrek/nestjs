import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../../users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUser(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateUser(
    userId: number,
    createUserDto: CreateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return await this.userRepository.update(
      { id: userId },
      { ...createUserDto, updatedAt: new Date() },
    );
  }

  deleteUser(userId: number): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
