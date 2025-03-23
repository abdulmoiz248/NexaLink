import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Message } from 'src/Schemas/messageSchema';

@Injectable()
export class ChatService {

    constructor(@InjectModel('msg')private msg: Model<Message>){}

    async saveMessage(sender: string, receiver:string,message: string){
        return await new this.msg({sender,receiver,message}).save();
    }

    async getChatHistory(userId: string, receiver: string) {
        return this.msg.find({
          $or: [
            { sender: userId, receiver },
            { sender: receiver, receiver: userId },
          ],
        }).sort({ createdAt: 1 }).exec();
      }

      async getUnreadMessages(receiver: string) {
        return this.msg.find({ receiver ,read:false}).sort({ createdAt: 1 }).exec();
      }
      
      async markMessagesAsRead(receiver: string) {
        await this.msg.updateMany({ receiver, read: false }, { $set: { read: true } });
      }
      

      
      
}

