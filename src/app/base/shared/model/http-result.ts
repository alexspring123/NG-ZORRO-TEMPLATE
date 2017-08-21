export class HttpResult<T> {
    constructor(public code: number, public message: string, public data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}