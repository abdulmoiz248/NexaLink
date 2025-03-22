import { Body, Controller, Request,Get, Patch, UseGuards } from '@nestjs/common';
import { ChatrequestService } from './chatrequest.service';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';


@Controller('chatrequest')
@UseGuards(JwtAuthGuard)
export class ChatrequestController {
  constructor(private readonly chatrequestService: ChatrequestService) {}


  @Get('request')
  async sendRequest(@Request() req,@Body('recieverId') recieverId:string){
        return await this.chatrequestService.createChatRequest(req.user._id,recieverId);   
  }
  @Get('all')
  async getAllRequests(@Request() req,@Body('status') status:string){
        return await this.chatrequestService.getAllChatRequest(req.user._id,status);   
  }
 
  @Patch('update')
  async updateRequest(@Body('reqId') reqId:string,@Body('status') status:string){
        return await this.chatrequestService.updateChatRequest(reqId,status);   
  }
  
}
