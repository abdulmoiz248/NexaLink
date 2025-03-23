import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {messageSchema} from '../Schemas/messageSchema'

@Module({
  imports:[MongooseModule.forFeature([{name:'msg',schema:messageSchema}])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
