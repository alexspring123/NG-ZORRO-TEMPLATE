import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { PermissionGurid } from 'app/permission.gurid';
import { AppRoutingModule } from 'app/app-routing.module';
import { SessionService } from 'app/base/shared/session.service';
import { GlobalProviders, GlobalImportModule } from 'app/config/contents-modules';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    BrowserAnimationsModule,
    ...GlobalImportModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SessionService,
    PermissionGurid,
    ...GlobalProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
