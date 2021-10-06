module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    env: {
        e2e: {
            // This is needed otherwise there's a conflict with Jest
            plugins: [
                [
                    "babel-plugin-istanbul",
                    {
                        extension: [".js", ".vue"]
                    }
                ]
            ]
        }
    }
};
