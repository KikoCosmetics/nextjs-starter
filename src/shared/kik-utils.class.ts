import {KikFormBuilder} from "@/modules/form";

export class KikUtils {

    static get EMAIL_DENIED_CHARS(): string {
        return "\\\\|!\"£$%&/()='?^€*[\\]°#§<>,;:\\s";
    }

    static get EMAIL_RE(): RegExp {
        // eslint-disable-next-line max-len
        // return /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return new RegExp("^[^" + this.EMAIL_DENIED_CHARS + "]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    }

    static get FORM_BUILDER(): KikFormBuilder {
        if (!(this._formBuilder instanceof KikFormBuilder)) {
            this._formBuilder = new KikFormBuilder();
        }

        return this._formBuilder;
    }

    private static _formBuilder?: KikFormBuilder;

    static isArrayOrError(val: any, withMessage?: string): void {
        if (!Array.isArray(val)) {
            throw new Error(withMessage || "KikUtils => val was not an array");
        }
    }

    static isEmpty(val: any): boolean {
        return !val && val !== 0;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static isFunction(entity: any): entity is Function {
        return typeof entity === typeof isNaN;
    }

    static isFunctionOrError(entity: any, withMessage?: string): void {
        if (!this.isFunction(entity)) {
            throw new Error(withMessage || "KikUtils => entity was not a function");
        }
    }

    static isInstanceOrError<T = any>(val: any, klass: new (...args: any[]) => T, withMessage?: string): void {
        if (!(val instanceof klass)) {
            throw new Error(withMessage || "KikUtils => val was not instance of class");
        }
    }

    static isNotEmpty(val: any): boolean {
        return !this.isEmpty(val);
    }

    static isNotEmptyOrError(val: any, withMessage?: string): void {
        if (this.isEmpty(val)) {
            throw new Error(withMessage || "KikUtils => entity was not a function");
        }
    }

    static isObject(entity: any): boolean {
        return !!entity && entity === Object(entity) && entity.constructor === Object;
    }

    static isObjectOrError(val: any, withMessage?: string): void {
        if (!this.isObject(val)) {
            throw new Error(withMessage || "KikUtils => val was not an object");
        }
    }

    /**
     * This one is from underscore.js 1.13.6
     * It basically checks if a value is generically an object (meaning Array, Date, Map).
     * If you want a strict check use KikUtils.isObject instead.
     * [TS] TODO: It would be nice to exclude String, Number, Boolean and Symbol, but for now, this will do
     * @param val
     * @returns {boolean}
     */
    static isPrimitive(val: any): boolean {
        const type = typeof val;
        return type !== "function" && (type !== "object" || !val);

        // Possible solution => Object.prototype.toString.call(val)
        // This always returns [Object myType], so we could compare with a list of primitive types: ["number", "string", "symbol", "ecc.."]
    }

    static isString(entity: any): entity is string {
        return typeof entity === typeof "";
    }

    static isTruthyOrError(condition: any, withMessage?: string): void {
        if (!condition) {
            throw new Error(withMessage || "KikUtils => condition wasn't truthy");
        }
    }

    static noop(..._args_: any[]): void {
        // does nothing
    }

    static runSafely(fn: any): any {
        if (this.isFunction(fn)) {
            return fn();
        }
    }

}
