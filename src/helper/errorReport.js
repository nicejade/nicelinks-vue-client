import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

const sentryUrl = 'https://83bb7dd4741c4bfe80830f7c4f5e3e0c@sentry.io/237022'

export default {
  init () {
    Raven
      .config(sentryUrl, {
        environment: process.env.NODE_ENV,
        ignoreUrls: ['127.0.0.1', 'localhost']
      })
      .addPlugin(RavenVue, Vue)
      .install()
  },
  captureException (...args) {
    if (process.env.NODE_ENV === 'production') {
      return Raven.captureException(...args)
    }
  }
}
