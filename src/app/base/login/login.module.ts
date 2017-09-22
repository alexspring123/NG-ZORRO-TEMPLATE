import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { LoginServiceImpl } from "app/providers/login.service-impl";
import { SessionService } from "app/base/shared/session.service";
import { LoginRoutingModule } from "app/base/login/login-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [LoginServiceImpl, SessionService]
})
export class LoginModule {
}