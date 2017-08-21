import { Observable } from "rxjs/Observable";
import { Session } from "app/shared/model/session";
import { HttpResult } from "app/shared/model/http-result";

/**登录服务 */
export interface LoginService {
    login(logData: { login: string, password: string }): Observable<HttpResult<Session>>;
}