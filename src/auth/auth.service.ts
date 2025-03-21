import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"; 
@Injectable()
export class AuthService {
    constructor(private userService:UserService,private jwt:JwtService) {

    }
    async validateUser(username:string,password:string){
        const user = await this.userService.getUserByUsername(username);
        if(user && user.password === password){
            return user;
        }
        return null;
    }

    async signUp(username: string, password: string) {
     
        await this.userService.createUser(username, password);
        return { message: 'User created successfully' };
    }

    async login(username: string, password: string) {
      const user = await this.userService.getUserByUsername(username);
      if (!user) throw new UnauthorizedException('Invalid credentials');
       
      const match=await bcrypt.compare(password,user.password);
      if(!match) throw new UnauthorizedException('Invalid credentials');

      const token=this.jwt.sign({userId:user._id,userName:user.username});
      return {access_token:token};
     
    }
}