import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/Schemas/userSchema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import {JwtStrategy} from './jwtStrategy'


@Module({
  imports: [
  PassportModule,
    JwtModule.register({
      secret:'hahahaha',
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,JwtStrategy],
})
export class AuthModule {}
