// workbox-config.js

module.exports = {
  // Path to your custom service worker template
  swSrc: 'src/service-worker.js',

  // Output path for the final service worker with precache manifest
  swDest: 'build/service-worker.js',

  // Folder to search for files to cache
  globDirectory: 'build/',

  // Files to include in precache
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,mp3,m4a}'
  ],

  maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // 30 MB
};