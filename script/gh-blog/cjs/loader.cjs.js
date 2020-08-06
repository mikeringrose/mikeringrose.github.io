'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-596cb3ab.js');
require('./app-globals-a6610404.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["gh-blog_2.cjs",[[1,"gh-blog",{"name":[1]}],[1,"gh-post",{"gistId":[1,"gist-id"],"gist":[32]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});

exports.defineCustomElements = defineCustomElements;
