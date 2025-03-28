import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({cors:true})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{

  @WebSocketServer() server:Server;



  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected ', client.id );
  }


   constructor(private chatService: ChatService){}


   @SubscribeMessage('sendMessage')
   async handleMessage(
     @MessageBody() { sender, receiver, message }: { sender: string; receiver: string; message: string }
   ) {
     const receiverSocket = this.chatService.activeUsers.get(receiver);
     const savedMessage = await this.chatService.saveMessage(sender, receiver, message, receiverSocket);
   
     if (receiverSocket) {
       this.server.to(receiverSocket).emit('newMessage', { sender, message, delivered: true });
     }
   }
   

  @SubscribeMessage('join')
  async handleJoin(@MessageBody() userId:string,@ConnectedSocket() client:Socket){
    this.chatService.activeUsers.set(userId, client.id);
    this.server.emit('activeUsers', Array.from(this.chatService.activeUsers.keys()));
    
    await this.chatService.markDelivered(userId,this.server);
  }
  @SubscribeMessage('disconnectUser')
  handleDisconnect(@MessageBody() userId: string) {
    this.chatService.removeActiveUser(userId);
    this.server.emit('activeUsers', Array.from(this.chatService.activeUsers.keys()));
  }

  @SubscribeMessage('openChat')
  async handleOpenChat(@MessageBody() { senderId, receiverId }: { senderId: string; receiverId: string }) {
    await this.chatService.markMessagesAsRead(senderId, receiverId, this.server);
  }

  
  @SubscribeMessage('typing')
handleTyping(@MessageBody() { sender, receiver }: { sender: string; receiver: string }) {
  const receiverSocket = this.chatService.getUserSocket(receiver);
  if (receiverSocket) {
    this.server.to(receiverSocket).emit('typing', { sender });
  }
}

@SubscribeMessage('stopTyping')
handleStopTyping(@MessageBody() { sender, receiver }: { sender: string; receiver: string }) {
  const receiverSocket = this.chatService.getUserSocket(receiver);
  if (receiverSocket) {
    this.server.to(receiverSocket).emit('stopTyping', { sender });
  }
}


@SubscribeMessage('callUser')
handleCallUser(@MessageBody() { sender,receiver,signal }: { receiver: string; signal: any; sender: string }) {
  const receiverSocket = this.chatService.getUserSocket(receiver);
  if (receiverSocket) {
    this.server.to(receiverSocket).emit('callUser', { sender,signal });
  }
}

@SubscribeMessage('answerCall')
async handleAnswerCall(
  @MessageBody() { sender, receiver, signal }: { sender: string; receiver: string; signal: any }
) {
  const senderSocket = this.chatService.activeUsers.get(sender);
  if (senderSocket) {
    this.server.to(senderSocket).emit('callAccepted', { receiver, signal });
  }
}

@SubscribeMessage('iceCandidate')
async handleIceCandidate(
  @MessageBody() { sender, receiver, candidate }: { sender: string; receiver: string; candidate: any }
) {
  const receiverSocket = this.chatService.activeUsers.get(receiver);
  if (receiverSocket) {
    this.server.to(receiverSocket).emit('iceCandidate', { sender, candidate });
  }
}

@SubscribeMessage('endCall')
async handleEndCall(@MessageBody() { sender, receiver }: { sender: string; receiver: string }) {
  const receiverSocket = this.chatService.activeUsers.get(receiver);
  if (receiverSocket) {
    this.server.to(receiverSocket).emit('callEnded');
  }
}


}
