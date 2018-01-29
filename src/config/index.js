const files = require.context('.', true, /\.js$/)
const configs = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  configs[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default configs
