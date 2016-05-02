module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'browserify'],

    files: ['tests/**/*-tests.js', 'node_modules/babel-polyfill/dist/polyfill.js'],
    
    reporters: ['spec'],
    
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false
    },
    
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'tests/**/*.js': ['browserify']
    },

    browserify: {
      extensions: ['.js'],
      debug: true,
      files: [
        'tests/**/*.js'
      ],
      transform: [
        ['babelify', { 
          sourceMapRelative: './',
          'presets': [
            'es2015',
            'react'
          ]
        }]
      ],
      configure: (bundle) => {
        bundle.exclude('react/lib/ReactContext');
        bundle.exclude('react/lib/ExecutionEnvironment');
        bundle.exclude('react/addons');
      }
    },

    browsers: ['PhantomJS'],

    singleRun: false
  });
};