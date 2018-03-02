const sitemapGenerator = require('sitemap-generator');
const path = require('path')

// create generator
const generator = sitemapGenerator('https://nicelinks.site/?_escaped_fragment_', {
  maxDepth: 4,
  filepath: path.join(process.cwd(), '/dist/sitemap.xml'),
  maxEntriesPerFile: 50000,
  stripQuerystring: false
});

generator.on('error', (error) => {
  console.log(`🐛 Opps, Something error:`);
  console.log(error)
});

// register event listeners
generator.on('done', () => {
  console.log('😊  okay, sitemaps have created.')
});

// start the crawler
generator.start();