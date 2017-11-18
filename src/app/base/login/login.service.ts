import { Observable } from 'rxjs/Observable';
import { Session } from '../shared/model/session';
import { HttpResult } from '../shared/model/http-result';

/**预定义服务 */
export interface LoginService {
    /**
     * 登录
     */
    login(loginData: { login: string, password: string }): Observable<HttpResult<Session>>;

    /**
     * 注销
     * userCode：当前登录用户代码
     * token：当前登录的token
     * userCode和token必须有一个不为Null。
     * 登录后服务端会生成一个token并返回给界面，此时只需要传入token一个参数服务端即可完成注销
     */
    logout(token: string): Observable<HttpResult<any>>;

    /**
     * 修改密码
     * 处于安全，session不会保存用户的密码，因此修改密码时需要传入原始密码，服务端需要对原始密码和token进行验证
     * 服务端成功后不用返回data
     */
    changePassword(data: { token: string, oldPassword: string, newPassword: string }): Observable<HttpResult<any>>;
}
