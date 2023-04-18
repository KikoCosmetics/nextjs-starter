//
import {KikHttpVerbs} from "./kik-http-verbs.enum";
import {KikHttpParams} from "./kik-http-params.class";
export interface KikHttpConfig<T = any> {
    data?: T;
    headers?: Record<string, string>;
    method: KikHttpVerbs;
    params?: KikHttpParams;
    url: string;
}
