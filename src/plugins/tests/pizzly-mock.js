import { repositories } from "./constants.js"
module.exports = class Pizzly {
    constructor() {
    }
    integration(integration) {
        if (integration === "github") {
            return {
                auth(token) {
                    return {
                        async get(endpoint) {
                            if (endpoint.startsWith("/user/repos")) {
                                let query = endpoint.split("?").pop();
                                let per_page = query.split("&per_page=")[1].split("&")[0];
                                let page = query.split("&page=")[1].split("&")[0];
                                return {
                                    json() {
                                        return repositories.slice((page - 1) * per_page, page * per_page);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};