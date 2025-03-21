import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRequest } from 'src/Schemas/chatRequestSchema';

@Injectable()
export class ChatrequestService {
    constructor(@InjectModel('Chatrequest')private chatRequestModel:Model<ChatRequest>) {}

    
    async createChatRequest(sender:string,receiver:string){
        const newChatRequest=new this.chatRequestModel({sender,receiver});
        return await newChatRequest.save();
    }
    
    async getAllChatRequest(receiver:string,status:string){
       return  await this.chatRequestModel.find({receiver,status}).exec()
    }
    async getRequestStatus(reqId:string){
        return await this.chatRequestModel.findById(reqId).exec();
    }

    async updateChatRequest(reqID:string,status:string){
        const req=await this.chatRequestModel.findById(reqID).exec();
        if(!req) throw new Error('No Request Found');
        req.status=status;
        return await req.save();
     }
}
