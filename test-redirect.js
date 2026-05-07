const { pathToRegexp } = require('next/dist/compiled/path-to-regexp');

const keys = [];
const regexp = pathToRegexp('/:path+.html', keys);
console.log('/legal/license.html', regexp.test('/legal/license.html'));
console.log('/blog/my-post.html', regexp.test('/blog/my-post.html'));
console.log('/about.html', regexp.test('/about.html'));
console.log('/index.html', regexp.test('/index.html'));
