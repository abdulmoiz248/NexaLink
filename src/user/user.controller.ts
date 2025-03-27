import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(@Query('username') username: string){
    console.log(username);
    const user= await this.userService.getUserByUsername(username);
    if (user) {
      throw new HttpException('Username is already taken', HttpStatus.CONFLICT); 
    }
  }
}
