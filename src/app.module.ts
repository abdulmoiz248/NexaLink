import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatrequestModule } from './chatrequest/chatrequest.module';
@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URI!), UserModule, AuthModule, ChatrequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
