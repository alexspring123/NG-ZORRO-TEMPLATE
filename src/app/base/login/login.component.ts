import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginServiceImpl } from "app/providers/login.service-impl";
import { loginConfig } from "config/global-config";
import { SessionService } from "app/shared/session.service";
import { Session } from "app/shared/model/session";
import { HttpResult } from "app/shared/model/http-result";
@Component({
    moduleId: module.id,
    selector: 'app-login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    backgroundImage: string = loginConfig.background_image;
    formTitle: string = loginConfig.form_title;


    validateForm: FormGroup;

    userName: string;
    password: string;

    constructor(private fb: FormBuilder,
        private router: Router,
        private sessionService: SessionService,
        private loginService: LoginServiceImpl) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true],
        });
    }

    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        this.loginService.login({ login: this.userName, password: this.password }).subscribe(
            (result: HttpResult<Session>) => {
                if (result.code != 0) {
                    window.alert('登录失败：' + result.message);
                    return;
                }
                //加入本地缓存
                this.sessionService.putSession(result.data);
                //跳转页面
                this.router.navigateByUrl('/frame');
            },
            (error: any) => window.alert(error));
    }


}