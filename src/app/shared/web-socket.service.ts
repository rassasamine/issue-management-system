import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class WebSocketService {
  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public connect() {
    const path = `ws://localhost:8084/ims-chat/chat`;
    this.socket = new WebSocket(path);

    this.socket.onmessage = event => {
      this.listener.emit({ 'type': 'message', 'data': JSON.parse(event.data) });
    };
  }

  public send(data: string) {
    this.socket.send(data);
  }

  public getEventListener() {
    return this.listener;
  }
}
