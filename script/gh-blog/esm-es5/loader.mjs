import { a as patchEsm, b as bootstrapLazy } from './index-e95539b3.js';
import './app-globals-98438c2f.js';
var defineCustomElements = function (win, options) { return patchEsm().then(function () {
    return bootstrapLazy([["gh-blog_2", [[1, "gh-blog", { "name": [1] }], [1, "gh-post", { "gistId": [1, "gist-id"], "gist": [32] }]]], ["my-component", [[1, "my-component", { "first": [1], "middle": [1], "last": [1] }]]]], options);
}); };
export { defineCustomElements };
