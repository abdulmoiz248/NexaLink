import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from 'src/Schemas/userSchema';
import * as bcrypt from "bcrypt"; 

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async createUser(username: string, password: string) {
        const existingUser =await this.getUserByUsername(username);
        if (existingUser) {
            return null;
        }
        console.log(`Create ${username} with password ${password}`);
        const hashedpass=await bcrypt.hash(password,10);
        const user = new this.userModel({ username, password: hashedpass });
        return await user.save();
    }
    async getUserByUsername(username: string) {
        return await this.userModel.findOne({ username });
    }

    async getAllUsers() {
        return this.userModel.find().select("-password"); 
      }
    async getUserById(id) {
        return await this.userModel.findById(id).select("-password");
    }
   
}
