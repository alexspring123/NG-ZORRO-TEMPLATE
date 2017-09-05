import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from "app/base/login/login.module";
import { appRoutes } from "app/app.routing";
import { FrameModule } from "app/base/frame/frame.module";
import { PermissionGurid } from "app/permission.gurid";

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
  providers: [PermissionGurid],
  bootstrap: [AppComponent]
})
export class AppModule { }
