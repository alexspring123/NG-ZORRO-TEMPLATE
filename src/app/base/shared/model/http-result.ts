/** 
 * Htt调用返回结果对象
 * code：http请求返回码，0表示成功，非0表示失败
 * message：当code!=0时，message表示失败说明
 * data：当code==0时，data是返回的数据，当code!=0时，data为null
 */
export class HttpResult<T> {
    constructor(public code: number, public message: string, public data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}