export class KikEnv {
    static get IS_DEV() {
        return process.env.NODE_ENV === "development";
    }

    static get IS_PROD() {
        return process.env.NODE_ENV === "production";
    }

    static get SHOW_LOGGER() {
        return this.IS_DEV || process.env.NEXT_PUBLIC_SHOW_LOGGER === "true";
    }

}
