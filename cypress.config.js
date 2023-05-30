import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
    projectId: "shyc93",
    defaultCommandTimeout: 8000,
    e2e: {
        setupNodeEvents(on) {
            on("file:preprocessor", vitePreprocessor());
        }
    }
});
