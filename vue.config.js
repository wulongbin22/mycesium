const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack:{
    resolve:{
      fallback:{
        "url":false,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib") 
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
})
