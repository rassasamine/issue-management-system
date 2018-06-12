import { Component, OnInit } from '@angular/core';
import { Chat } from './../domain/Chat';
import { WebSocketService } from '../shared/web-socket.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Array<Chat>;
  chatBox: any;

  constructor(
    private socketService: WebSocketService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.messages = [];

    this.socketService.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const chatMessage: Chat = event.data;
        this.messages.push(chatMessage);
      }
    });
    this.socketService.connect();
  }

  public onSubmit(event: Event) {
    const chatMessage: Chat = new Chat();
    chatMessage.sender = this.authService.currentUser;
    chatMessage.message = this.chatBox;
    chatMessage.created = new Date();

    if (this.chatBox) {
      this.socketService.send(JSON.stringify(chatMessage));
      this.chatBox = '';
      event.preventDefault();
    }
  }

  public get currentUser() {
    return this.authService.currentUser;
  }
}
