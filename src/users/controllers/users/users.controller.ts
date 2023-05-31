import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  /**
   * We consume services through the class constructor
   * @param userService
   */
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return this.userService.fetchUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    /**
     * Example of how to handle exception
     */
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  /**
   * Traditional way of handeling route params
   * @param request
   * @param response
   */
  // @Get(':id')
  // getUsersById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  // }

  /**
   * Nest way of handeling route params
   */
  @Get(':id/:postId')
  getUserPostById(
    @Param('id', ParseIntPipe) id: string, //ParseIntPipe converts the param type into int
    @Param('postId') postId: string,
  ) {
    return {
      id,
      postId,
    };
  }

  /**
   * Traditional way of handeling post requests
   * @param request
   * @param response
   */
  // @Post()
  // createUserPost(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('Created');
  // }

  /**
   * Nest way of handeling post requests
   */
  @Post('Create')

  /**
   * applies validator decorators
   * @see CreateUserDto
   */
  @UsePipes(new ValidationPipe())
  createUserPost(@Body() userData: CreateUserDto) {
    console.log(userData);
    /**
     * Since we sanitize the data through our DTO
     * We can pass the data directly to our service
     * however we might consider using a type
     * instead of deriving types directly through our DTO
     * because we might not include all the properties
     * that is in our DTO
     * @see createUser
     */
    this.userService.createUser(userData);
    return userData;
  }
}
