import {AppProps} from "next/app";

import "@/styles/globals.scss";
// !STARTERCONF This is for demo purposes, remove @/styles/colors.scss import immediately
import "@/styles/colors.scss";
//
import "../js-extend.config";

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({
                   Component,
                   pageProps
               }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
