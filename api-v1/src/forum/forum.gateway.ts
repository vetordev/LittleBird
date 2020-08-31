import { SubscribeMessage, WebSocketGateway, OnGatewayInit, ConnectedSocket, MessageBody, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ForumGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('ForumGateway');

  afterInit(server: Socket) {
    this.logger.log('Inicializado!')
  };

  handleConnection(client: Socket) {
    console.log('Nova conexão: ' + client.id);
  };

  handleDisconnect(client: Socket) {
    console.log('Desconexão: ' + client.id)
  };

  @SubscribeMessage('first message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: string): void {
    // return { event: 'response to message', data }
    this.wss.emit('response to message', data)
  };
}
