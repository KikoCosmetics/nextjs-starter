import {KikHttpService} from "../modules/http2/services/kik-http.service";
import {KikHttpConfig} from "../modules/http2/models/kik-http-config.class";
import {KikHttpVerbs} from "../modules/http2/models/kik-http-verbs.enum";

enum KikEvaUrlKeys {
    ADD_TO_CART = "addToCart"
}

export class KikEvaRestService extends KikHttpService {

    static readonly #baseUrl: string = "./";

    static #urls: Record<KikEvaUrlKeys, string> = {
        [KikEvaUrlKeys.ADD_TO_CART]: "foo/bar"
    }.mapValues((value) => `${this.#baseUrl}${value}`);

    // EXAMPLE
    static postAddToCart(data: any): KikHttpConfig {
        const config: KikHttpConfig = this.generateHttpConfig(this.#urls[KikEvaUrlKeys.ADD_TO_CART], KikHttpVerbs.POST);
        config.data = data;

        return config;
    }
}
