import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './home/feed/feed.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

import { IssuesModule } from './issues/issues.module';

import { AuthService } from './shared/auth.service';
import { UsersService } from './shared/users.service';
import { IssuesService } from './shared/issues.service';
import { WebSocketService } from './shared/web-socket.service';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    ChatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IssuesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [,
    IssuesService,
    UsersService,
    WebSocketService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
