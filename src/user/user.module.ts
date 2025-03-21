import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../Schemas/userSchema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'User', schema: userSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
