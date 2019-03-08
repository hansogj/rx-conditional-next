module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "./src/**/*.ts" },
            { pattern: "./test/**/*.ts" }
        ],
        preprocessors: {
            "./src/**/*.ts": ["karma-typescript", "coverage"],
            "./test/**/*.ts": ["karma-typescript"]
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                target: "ES2015",
                lib: ["es5", "es6", "es2015", "dom"]
            }
        },
        reporters: ["progress", "coverage", "karma-typescript"],
        browsers: ["ChromeHeadless"]
    });
};
