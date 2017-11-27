import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'app/base/shared/session.service';
import { LoginServiceImpl } from 'app/providers/login.service-impl';
import { Session } from 'app/base/shared/model/session';
import { HttpResult } from 'app/base/shared/model/http-result';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: []
})
export class ChangePasswordComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private loginService: LoginServiceImpl,
    private location: Location) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator() {
    setTimeout(_ => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  cancel() {
    this.location.back();
  }

  _submitForm() {
    if (this.validateForm.invalid) {
      return;
    }

    const session: Session = this.sessionService.getSession();

    this.loginService.changePassword(
      {
        token: session.token,
        oldPassword: this.validateForm.controls['oldPassword'].value,
        newPassword: this.validateForm.controls['password'].value
      }).subscribe(
      result => {
        window.alert('密码修改成功，请重新登录');
        this.router.navigateByUrl('/login');
      },
      error => window.alert('修改密码失败：' + error));
  }
}
