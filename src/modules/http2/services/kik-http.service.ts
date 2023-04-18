import axios, {InternalAxiosRequestConfig} from "axios";
//
import {KikHttpVerbs} from "../models/kik-http-verbs.enum";
import {KikHttpConfig} from "../models/kik-http-config.class";

export class KikHttpService {

  protected static get _AUTH_HEADER(): string {
    return `Bearer ${this.#token}`;
  }

  static #token: string;

  static {
    this.#handleAuth();
  }

  static generateHttpConfig(url: string, method: KikHttpVerbs = KikHttpVerbs.GET): KikHttpConfig {
    url = this.removeTrailingSlash(url);

    return {
      method,
      url
    } as KikHttpConfig;
  }

  static removeTrailingSlash(target: string): string {
    return target.replace(new RegExp("/$"), "");
  }

  // TODO: CHECK IF IMPLEMENTING CACHE IS NEEDED (DEDUPE)
  static request<T = any>(config: KikHttpConfig): Promise<T> {

    return axios.request(config);
  }

  static #handleAuth(): void {
    axios.interceptors.request.use( (req: InternalAxiosRequestConfig) => {
      if(this.#token) {
          req.headers["Authorization"] = this._AUTH_HEADER;
      }

      return req;
    });
  }

}
