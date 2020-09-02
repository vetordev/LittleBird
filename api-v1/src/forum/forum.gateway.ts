import { SubscribeMessage, WebSocketGateway, OnGatewayInit, ConnectedSocket, MessageBody, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { HandleJoinForumDto, HandleLeaveForumDto } from './forum.dto';

class Message {
  forum_id: number;
  user_id: number;
  comment_id: number;
  comment_content: string;
};

@Injectable()
@WebSocketGateway(3001, { namespace: '/forum' })
export class ForumGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('ForumGateway');

  afterInit(server: Socket) {
    this.logger.log('Namespace "/forum" pronto')
  };

  handleConnection(client: Socket) {
    console.log('Nova conexão: ' + client.id);
  };

  handleDisconnect(client: Socket) {
    console.log('Desconexão: ' + client.id)
  };

  @SubscribeMessage('join forum')
  handleJoinForum(@ConnectedSocket() client: Socket, @MessageBody() data: HandleJoinForumDto): void {

  };

  @SubscribeMessage('leave forum')
  handleLeaveForum(@ConnectedSocket() client: Socket, @MessageBody() data: HandleLeaveForumDto): void {

  };

  @SubscribeMessage('new message')
  handleNewMessage(message: Message): void {

  };

}
