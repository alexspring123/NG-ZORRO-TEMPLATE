import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

/**
 * 表单工具类
 */
export class FormUtil {
    /**
     * 设置指定控制器以及子控制器为dirty
     */
    public static markAsDirtyDeep(control: AbstractControl): void {
        if (!control) {
            return;
        }

        control.markAsDirty();

        if (control instanceof FormGroup) {
            const ctl = <FormGroup>control;
            for (const inner in ctl.controls) {
                if (inner) {
                    this.markAsDirtyDeep(ctl.get(inner));
                }
            }
        } else if (control instanceof FormArray) {
            const ctl = <FormArray>control;
            for (const inner in ctl.controls) {
                if (inner) {
                    this.markAsDirtyDeep(ctl.get(inner));
                }
            }
        }
    }

    /**
     * 验证表单
     * form：表单
     * formErrors：表单验证结果（结构必须与form中的控制器结构一致）
     * validationMessages：表单检查项以及错误消息定义（数组特殊处理）
     */
    public static valid(form: FormGroup, formErrors: {}, validationMessages: {}): void {
        if (!form) {
            return;
        }
        for (const field in formErrors) {
            if (field) {
                this.megerError(field, formErrors, form.get(field), validationMessages[field]);
            }
        }
    }

    /**
   * field：错误信息ID
   * errors：field对应的错误内容上一层对象
   * control：表单控件（可能是FormGroup、FormArray、FormControl）
   * messages：错误信息定义
   */
    private static megerError(field: any, errors: any, control: AbstractControl, messages: any): void {
        if (!field || !control) {
            return;
        }

        // errors中对应field的内容是字符串，表示已经是叶子节点
        if (typeof errors[field] === 'string') {
            errors[field] = '';
            if (control && !control.valid && (control.dirty || control.touched)) {
                for (const key in control.errors) {
                    if (key) {
                        errors[field] += messages[key] + ' ';
                    }
                }
            }
        } else if (errors[field] instanceof Array) {// errors中对应field的内容是数组，需要循环处理每一个原始，数组时messages不是数组，因此原样返回
            const arr = <Array<any>>errors[field];
            arr.forEach((f, index) => {
                // TODO 此处只考虑数组元素是对象，还需要增加string类型的判断
                for (const ff in f) {
                    if (ff) {
                        this.megerError(ff, errors[field][index], control.get(index.toString()).get(ff), messages[ff]);
                    }
                }
            });
        } else {// errors中对应field的内容是对象，需要循环每一个字段
            for (const f in errors[field]) {
                if (f) {
                    this.megerError(f, errors[field], control.get(f), messages[f]);
                }
            }
        }
    }
}

