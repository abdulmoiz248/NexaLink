import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signup:signupDto) {
    return  this.authService.signUp(signup.username, signup.password);
   
  }
  
  @Post('login')
  login(@Body() signup:signupDto) {
    return this.authService.login(signup.username, signup.password);
  }
  
}