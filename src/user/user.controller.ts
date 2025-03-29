import { Controller, Get, HttpException, HttpStatus,BadRequestException, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

import { Types } from 'mongoose';
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
  async getAUsers(@Query('username') id: string) {
    
      if (!Types.ObjectId.isValid(id)) {
          throw new BadRequestException('Invalid user ID format');
      }
  
      const objectId = new Types.ObjectId(id);
   
      const user = await this.userService.getUserById(objectId);
   
      return user;
  }
  

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() req ){
    

    let users= await this.userService.getAllUsers();
   
    users=users.filter((user)=>user._id!=req.user.userId);
   
    return users;
  }

}
