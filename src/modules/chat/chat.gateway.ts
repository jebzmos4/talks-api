import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";


@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private io: Server;
  private logger = new Logger(ChatGateway.name);

  afterInit(server: Server) {
    this.io = server;
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: number) {
    client.join(`room-${roomId}`);
    client.emit('joinedRoom', roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: number) {
    client.leave(`room-${roomId}`);
    client.emit('leftRoom', roomId);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, message: string) {
    const roomId = Object.keys(client.rooms).find(roomId => roomId.startsWith('room-'));
    if (roomId) {
      const chatMessage = {
        message,
        senderId: client.id,
        timestamp: Date.now(),
      };
      this.io.to(roomId).emit('chatMessage', chatMessage);
    }
  }
}
