import { Controller, Get, HttpException, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';


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
    return {message: 'Username is available'};
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  async getAUsers(@Query('username') username: string){
    const users= await this.userService.getUserByUsername(username);
    return users;
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() req ){
    console.log(req.user);

    let users= await this.userService.getAllUsers();
   
    users=users.filter((user)=>user._id!=req.user.userId);
   
    return users;
  }

}
