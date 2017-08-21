import { Observable } from "rxjs/Observable";
import { Session } from '../shared/model/session';
import { HttpResult } from '../shared/model/http-result';

/**登录服务 */
export interface LoginService {
    login(logData: { login: string, password: string }): Observable<HttpResult<Session>>;
}