module.exports = {
  content: ['./src/index.html', './src/**/*.ts', './src/**/*.tsx'],
  whitelistPatterns: [/dk-/],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
}
