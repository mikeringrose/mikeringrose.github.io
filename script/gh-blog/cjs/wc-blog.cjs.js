'use strict';

const index = require('./index-596cb3ab.js');
require('./app-globals-a6610404.js');

index.patchBrowser().then(options => {
  return index.bootstrapLazy([["gh-blog_2.cjs",[[1,"gh-blog",{"name":[1]}],[1,"gh-post",{"gistId":[1,"gist-id"],"gist":[32]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});
