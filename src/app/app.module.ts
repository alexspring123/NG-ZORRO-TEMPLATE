import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { MenuComponent } from "app/shared/menu/menu.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadComponent } from "app/shared/heard/head.component";
import { LoginModule } from "app/base/login/login.module";
import { appRoutes } from "app/app.routing";
import { FrameModule } from "app/base/frame/frame.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),

    RouterModule.forRoot(appRoutes),
    LoginModule,
    FrameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
