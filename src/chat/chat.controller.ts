import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getHistory(@Req() req,@Query('receiverId') reciever:string) {
    return this.chatService.getChatHistory(req.user.username,reciever);
  }
}
