import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Message } from 'src/Schemas/messageSchema';

@Injectable()

export class ChatService {

     activeUsers=new Map<string,string>();

    constructor(@InjectModel('msg')private msg: Model<Message>){}

    async saveMessage(sender: string, receiver: string, message: string, receiverSocket?: string) {
      const newMessage = new this.msg({
        sender,
        receiver,
        message,
        delivered: !!receiverSocket, 
        read: false,
        timestamp: new Date(),
      });
    
      return await newMessage.save();
    }

    async getChatHistory(userId: string, receiverId: string) {
      const sender = await this.msg.find({ sender: userId, receiver: receiverId }).sort({ time: 1 });
      const reciever = await this.msg.find({ sender: receiverId, receiver: userId }).sort({ time: 1 });
    
      return { sender, reciever };
    }
    

      async getUnreadMessages(receiver: string) {
        return this.msg.find({ receiver ,read:false}).sort({ createdAt: 1 }).exec();
      }
      
      getUserSocket(userId: string): string | undefined {
        return this.activeUsers.get(userId);
      }

      async markDelivered(receiver: string, server: Server) {
        const messages = await this.msg.find({ receiver, delivered: false });
      
        for (const msg of messages) {
          msg.delivered = true;
          await msg.save(); 
      
          const senderSocketId = this.getUserSocket(msg.sender);
          if (senderSocketId) {
            server.to(senderSocketId).emit('messageDelivered', { messageId: msg._id, receiver });
          }
        }
      }
      

      async markMessagesAsRead(sender: string, receiver: string, server: Server) {
        const messages = await this.msg.find({ sender, receiver, read: false });
      
        for (const msg of messages) {
          msg.read = true;
          await msg.save(); // Update DB
      
          const receiverSocketId = this.getUserSocket(receiver);
          if (receiverSocketId) {
            server.to(receiverSocketId).emit('messageSeen', { messageId: msg._id, sender });
          }
        }
      }
      
      
      removeActiveUser(userId: string) {
        this.activeUsers.delete(userId);
      }
      

      
      
}

