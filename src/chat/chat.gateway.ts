import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({cors:true})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{

  @WebSocketServer() server:Server;

  private activeUsers=new Map<string,string>();

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected ', client.id );
  }
  handleDisconnect(client: any): void {
    console.log('Client disconnected ', client.id );
    const userId = [...this.activeUsers.entries()].find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) this.activeUsers.delete(userId);
    this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));
  }

   constructor(private chatService: ChatService){}


  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() {sender,reciever,message}: {sender:string,reciever:string,message:string} ){
    const recieverSocket=this.activeUsers.get(reciever);
    this.chatService.saveMessage(sender,reciever,message);
    if(recieverSocket){
      this.server.to(recieverSocket).emit('newMessage',{sender,message});
      await this.chatService.markMessagesAsRead(reciever);
    }
  }


  @SubscribeMessage('join')
  async handleJoin(@MessageBody() userId:string,@ConnectedSocket() client:Socket){
    this.activeUsers.set(userId, client.id);
    this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));
    
    const unread=await this.chatService.getUnreadMessages(userId);
    
    unread.forEach((msg) => {
      this.server.to(client.id).emit('receiveMessage', { sender: msg.sender, message: msg.message });
     
    });
    await this.chatService.markMessagesAsRead(userId);
  
    console.log(`User ${userId} joined and received ${unread.length} unread messages.`);
  }

  
}
