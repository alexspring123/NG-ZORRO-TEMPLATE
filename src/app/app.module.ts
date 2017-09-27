import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionGurid } from "app/permission.gurid";
import { AppRoutingModule } from 'app/app-routing.module';
import { SessionService } from 'app/base/shared/session.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [SessionService, PermissionGurid],
  bootstrap: [AppComponent]
})
export class AppModule { }
