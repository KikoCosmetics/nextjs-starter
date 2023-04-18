import {KikHttpService} from "../modules/http2/services/kik-http.service";
import {KikHttpConfig} from "../modules/http2/models/kik-http-config.class";

enum KikContentfulUrlKeys {
    FANCY_CONTENT = "fancyContent"
}

export class KikContentfulRestService extends KikHttpService {

    static #urls: Record<KikContentfulUrlKeys, string> = {
        [KikContentfulUrlKeys.FANCY_CONTENT]: "foo/bar"
    };

    // EXAMPLE
    static getSomeFancyContent(data: any): KikHttpConfig {
        const config: KikHttpConfig = this.generateHttpConfig(this.#urls[KikContentfulUrlKeys.FANCY_CONTENT]);
        config.data = data;

        return config;
    }
}
