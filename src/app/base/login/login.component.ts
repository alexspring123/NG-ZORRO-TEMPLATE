import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceImpl } from 'app/providers/login.service-impl';
import { loginConfig } from 'config/global-config';
import { SessionService } from 'app/base/shared/session.service';
import { Session } from 'app/base/shared/model/session';
import { HttpResult } from 'app/base/shared/model/http-result';
import { FormUtil } from 'app/base/shared/form-util';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    formErrors = {
        'userName': '',
        'password': '',
    };

    validationMessages = {
        'userName': { 'required': '代码不能为空' },
        'password': { 'required': '名称不能为空' }
    };

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
            userName: [this.userName, [Validators.required]],
            password: [this.password, [Validators.required]],
        });

        this.validateForm.valueChanges.subscribe((value) => this.checkForm());
    }

    private checkForm(): void {
        FormUtil.valid(this.validateForm, this.formErrors, this.validationMessages);
    }

    submitForm() {
        if (this.validateForm.invalid) {
            FormUtil.markAsDirtyDeep(this.validateForm);
            this.checkForm();
            return;
        }
        const loginData = {
            login: this.validateForm.get('userName').value,
            password: this.validateForm.get('password').value
        };
        this.loginService.login(loginData).subscribe(
            (result: HttpResult<Session>) => {
                if (result.code !== 0) {
                    window.alert('登录失败：' + result.message);
                    return;
                }
                // 加入本地缓存
                this.sessionService.putSession(result.data);
                // 跳转页面
                this.router.navigateByUrl('/frame');
            },
            (error: any) => window.alert(error));
    }
}
