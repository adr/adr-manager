import { loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
    // Empty prefix (not Vite's default VITE_) so the custom ADR_ROOT_FOLDER var is exposed.
    const env = loadEnv(mode, process.cwd(), "");
    const adrRootFolder = env.ADR_ROOT_FOLDER || process.env.ADR_ROOT_FOLDER || "adr/decisions";

    return {
        server: {
            host: "localhost",
            port: 8000
        },
        base: "/",
        // Inject the (build-time) ADR root folder as a compile-time constant that
        // src/plugins/config.js reads and normalizes.
        define: {
            __ADR_ROOT_FOLDER__: JSON.stringify(adrRootFolder)
        },
        // required for Vuetify (see https://github.com/vuetifyjs/vuetify/discussions/4068#discussioncomment-1357093)
        resolve: {
            alias: {
                vue: "vue/dist/vue.runtime.esm.js"
            },
            dedupe: ["vue", "vuetify"]
        },
        plugins: [
            createVuePlugin(),
            Components({
                resolvers: [VuetifyResolver()]
            })
        ]
    };
};
