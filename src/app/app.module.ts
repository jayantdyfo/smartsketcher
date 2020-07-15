import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery'
import { ViewLayoutComponent } from './view-layout/view-layout.component';
import { VariableService } from './services/variable.service';
import { UserService } from './services/user.service';
import {  HomePage } from './home/home.page';
//import { ContextComponent } from './service';
import { ResizeRoomComponent } from './pages/resize-room/resize-room.component';
import {ContextComponent, PopAndOtherService } from './services/pop-and-other.service';


@NgModule({
  declarations: [AppComponent, ViewLayoutComponent,ContextComponent,ResizeRoomComponent],
  entryComponents: [
        // HomeComponent,
        ViewLayoutComponent,ContextComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    ViewLayoutComponent,
    VariableService,
    HomePage,
    ResizeRoomComponent,
    PopAndOtherService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
