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
import { ContextComponent, HomePage } from './home/home.page';

@NgModule({
  declarations: [AppComponent, ViewLayoutComponent,ContextComponent],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
