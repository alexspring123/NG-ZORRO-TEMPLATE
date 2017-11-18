import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Session } from 'app/base/shared/model/session';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'app/base/shared/form-util';
import { Role, RoleService } from 'app/contents/role/role.service';

@Component({
    moduleId: module.id,
    selector: 'app-cmall-role-edit',
    templateUrl: 'role-edit.component.html',
    styleUrls: ['role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
    formErrors = {
        'name': '',
        'projectCode': '',
        'remark': '',
    };

    validationMessages = {
        'name': { 'required': '代码不能为空' },
        'projectCode': { 'required': '必须选择项目' },
        'remark': { 'maxlength': '说明长度必须小于等于256' }
    };

    session: Session;
    validateForm: FormGroup = new FormGroup({});
    role: Role = new Role();
    _isNew = true;
    _loading = false;
    _saving = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private roleService: RoleService,
        private sessionService: SessionService) {
        this.session = sessionService.getSession();
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const name = params['name'];

            this.buildForm();
            if (name) {
                this._isNew = false;
                this.loadRole(name);
            }
        });
    }

    private buildForm(): void {
        this.validateForm = this.fb.group({
            'name': this.fb.control(this.role.name, [Validators.required]),
            'remark': this.fb.control(this.role.remark, [Validators.maxLength(256)]),
        });
        this.validateForm.valueChanges.subscribe(value => this.checkForm());
    }

    private checkForm(): void {
        FormUtil.valid(this.validateForm, this.formErrors, this.validationMessages);
    }

    save(): void {
        if (this.validateForm.invalid) {
            FormUtil.markAsDirtyDeep(this.validateForm);
            this.checkForm();
            return;
        }

        this.role = this.validateForm.value;

        if (this._isNew) {
            this.doSaveNew(this.role);
        } else {
            this.doSaveModify(this.role);
        }
    }

    private doSaveNew(role: Role): void {
        this._saving = true;
        this.roleService.saveRole(role).subscribe(
            result => {
                this._saving = false;
                if (result.code !== 0) {
                    this.messageService.error('保存角色失败：' + result.message);
                    return;
                }
                this.messageService.error('保存成功');
                this.router.navigate(['/frame/basic/role/view', role.name]);
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    private doSaveModify(role: Role): void {
        this._saving = true;
        this.roleService.saveModify(role).subscribe(
            result => {
                this._saving = false;
                if (result.code !== 0) {
                    this.messageService.error('修改角色失败：' + result.message);
                    return;
                }
                this.messageService.error('保存成功');
                this.router.navigate(['/frame/basic/role/view', role.name]);
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    private loadRole(name: string) {
        this._loading = true;
        this.roleService.getRole(name).subscribe(
            result => {
                this._loading = false;
                if (result.code !== 0) {
                    this.messageService.error('加载角色失败：' + result.message);
                    return;
                }
                this.role = result.data;
                if (this.role) {
                    this.buildForm();
                } else {
                    this.modalService.warning({
                        title: '加载角色失败',
                        content: '不存在角色' + name
                    });
                    this.router.navigateByUrl('/frame/role');
                }
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            });
    }
}
