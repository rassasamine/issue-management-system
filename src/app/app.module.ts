import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './home/feed/feed.component';
import { ChatComponent } from './chat/chat.component';

import { IssuesModule } from './issues/issues.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IssuesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
