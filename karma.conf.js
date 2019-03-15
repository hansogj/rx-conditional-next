module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.spec.json',
        },

        files: ['src/**'],
        preprocessors: {
            'src/**': ['karma-typescript',  'coverage']
        },
        autoWatch: true,
        singleRun: false,
        reporters: ['progress', 'coverage', 'karma-typescript'],
        browsers: ['ChromeHeadless'],
    });
};
