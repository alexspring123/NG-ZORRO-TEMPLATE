export class Role {
    remark?: string;

    constructor(public code: string, public name: string) {
        this.code = code;
        this.name = name;
    }
}