import { Module } from '@nestjs/common';
import { ChatrequestService } from './chatrequest.service';
import { ChatrequestController } from './chatrequest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { chatRequestSchema } from 'src/Schemas/chatRequestSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chatrequest', schema: chatRequestSchema }])],
  controllers: [ChatrequestController],
  providers: [ChatrequestService],
})
export class ChatrequestModule {}
