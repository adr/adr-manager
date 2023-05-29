import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
    projectId: "shyc93",
    e2e: {
        setupNodeEvents(on) {
            on("file:preprocessor", vitePreprocessor());
        }
    }
});
