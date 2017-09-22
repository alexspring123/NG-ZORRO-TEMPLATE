import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { LoginService } from "app/base/login/login.service";
import { Session } from "app/base/shared/model/session";
import { HttpResult } from "app/base/shared/model/http-result";

@Injectable()
export class LoginServiceImpl implements LoginService {

    login(loginData: { login: string; password: string; }): Observable<HttpResult<Session>> {
        return new Observable(observer => {
            observer.next(this.getDemoSession());
        });
    }

    logout(token: string): Observable<HttpResult<any>> {
        return new Observable(observer => {
            observer.next(new HttpResult<any>(0, 'OK', null));
        });
    }

    changePassword(data: { token: string; oldPassword: string; newPassword: string; }): Observable<HttpResult<any>> {
        return new Observable(observer => {
            observer.next(new HttpResult<any>(0, 'OK', null));
        });
    }

    private getDemoSession(): HttpResult<Session> {
        let result: HttpResult<Session> = {
            code: 0,
            message: "OK",
            data: {
                userCode: "001",
                userName: "程新文",
                token: "1234567890",
                menus: [
                    {
                        title: "控制台",
                        path: "",
                        icon: "home",
                        subMenus: []
                    },
                    {
                        title: "基本资料",
                        path: "",
                        subMenus: [
                            { title: "角色", path: "/frame/role", icon: "user", subMenus: [] },
                            { title: "员工", path: "", subMenus: [] },
                            { title: "商品", path: "", subMenus: [] },
                            { title: "门店", path: "", subMenus: [] },
                        ]
                    },
                    {
                        title: "采购管理",
                        path: "",
                        icon: "home",
                        subMenus: [
                            { title: "采购订单", path: "", subMenus: [] },
                            { title: "自营进货单", path: "", subMenus: [] },
                            { title: "采购退货单", path: "", subMenus: [] },
                            { title: "采购权限", path: "", subMenus: [] },
                        ]
                    },
                    {
                        title: "零售管理",
                        path: "",
                        subMenus: [
                            { title: "门店", path: "", subMenus: [] },
                            { title: "补货策略", path: "", subMenus: [] },
                            { title: "补货单", path: "", subMenus: [] },
                            { title: "配货单", path: "", subMenus: [] },
                            { title: "配货退货单", path: "", subMenus: [] },
                        ]
                    },
                    {
                        title: "财务管理",
                        path: "",
                        subMenus: [
                            { title: "结算单位", path: "", subMenus: [] },
                            { title: "财务科目", path: "", subMenus: [] },
                            { title: "对账", path: "", subMenus: [] },
                            { title: "发票登记", path: "", subMenus: [] },
                            { title: "应收款管理", path: "", subMenus: [] },
                            { title: "应付款管理", path: "", subMenus: [] },
                        ]
                    }
                ],
                permissions: [
                    { code: '/role/view', name: '角色查看权' },
                    { code: '/role/edit', name: '角色编辑权' },
                    { code: '/role/delete', name: '角色删除权' }
                ]

            }
        };
        return result;
    }
}