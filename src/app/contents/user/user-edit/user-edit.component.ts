import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { SessionService } from "app/base/shared/session.service";
import { NzMessageService } from "ng-zorro-antd";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormUtil } from "app/base/shared/form-util";
import { User, UserService } from "app/contents/user/user.service";

@Component({
    moduleId: module.id,
    selector: 'cmall-user-edit',
    styleUrls: ['user-edit.component.css'],
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    formErrors = {
        'login': '',
        'name': '',
        'mobile': '',
        'remark': '',
    };

    validationMessages = {
        'login': {
            'required': '登录名不能为空',
            'maxlength': '登录名长度必须小于等于15'
        },
        'name': {
            'required': '名称不能为空',
            'maxlength': '名称长度必须小于等于20'
        },
        'mobile': { 'maxlength': '手机号长度必须小于等于15' },
        'remark': { 'maxlength': '说明长度必须小于等于256' }
    };

    validateForm: FormGroup = new FormGroup({});
    user: User = new User();

    _isNew: boolean = true;
    _loading: boolean = false;
    _saving: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private messageService: NzMessageService,
        private userService: UserService,
        private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.route.params.forEach((params: Params) => {
            let code = params["code"];
            if (code) {
                this._isNew = false;
                this.load(code);
            }
        });
    }

    private buildForm(): void {
        this.validateForm = this.fb.group({
            'code': this.fb.control(this.user.code, []),
            'login': this.fb.control(this.user.login, [Validators.required, Validators.maxLength(15)]),
            'name': this.fb.control(this.user.name, [Validators.required, Validators.maxLength(20)]),
            'mobile': this.fb.control(this.user.mobile, [Validators.maxLength(15)]),
            'hasOperateView': this.fb.control(this.user.hasOperateView),
            'hasPropertyView': this.fb.control(this.user.hasPropertyView),
            'hasBrandView': this.fb.control(this.user.hasBrandView),
            'remark': this.fb.control(this.user.remark, [Validators.maxLength(256)]),
        });
        this.validateForm.valueChanges.subscribe(value => this.checkForm());
    }

    private checkForm(): void {
        FormUtil.valid(this.validateForm, this.formErrors, this.validationMessages);
    }

    cancel(): void {
        this.location.back();
    }

    save(): void {
        if (this.validateForm.invalid) {
            FormUtil.markAsDirtyDeep(this.validateForm);
            this.checkForm();
            return;
        }

        this.user = this.validateForm.value;

        this._saving = true;
        this.userService.save(this.user).subscribe(
            result => {
                this._saving = false;
                if (result.code != 0) {
                    this.messageService.error('保存用户失败：' + result.message);
                    return;
                }
                this.messageService.success('保存成功');
                this.router.navigate(["/frame/basic/user/view", result.data]);
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    private load(code: string) {
        this._loading = true;
        this.userService.getUser(code).subscribe(
            result => {
                this._loading = false;
                if (result.code != 0) {
                    this.messageService.error('加载用户失败：' + result.message);
                    return;
                }
                this.user = result.data;
                this.buildForm();
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

}