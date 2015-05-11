PlatypusTS Distribution
==============

This repo is for distribution of PlatypusTS through bower and npm.

## Install

You can use either `npm` or `bower` to install this package.

### npm

```shell
npm install platypus --save
```

This package works in CommonJS and on window, so if you are using 
[Browserify](https://github.com/substack/node-browserify) or other CommonJS 
module loaders you can use `require('platypus')`. If you want to use `plat` on 
`window`, you need to include it in your `index.html`:

```html
<script src="/node_modules/platypus/dist/platypus.min.js"></script>
```

### bower

```
bower install platypus --save
```

This package works with CommonJS and on window. We recommend using  [Browserify](https://github.com/substack/node-browserify) 
with [debowerify](https://github.com/eugeneware/debowerify), which gives you the ability to use `require('platypus')` with bower components. 
If you want to use `plat` on `window`, you need to include it in your `index.html`:

```html
<script src="/bower_components/platypus/dist/platypus.min.js"></script>
```

## Use with TypeScript

This package includes a declaration file, as well as the source `.js` and `.min.js` file. If you are 
using TypeScript, you will want to reference the declaration file. The recommended way is through TSD.

### with TSD

```shell
tsd link
```

```
/// <reference path="/typings/tsd.d.ts" />
```

### without TSD

```ts
/// <reference path="/node_modules/platypus/dist/platypus.d.ts" />
```

```ts
/// <reference path="/bower_components/platypus/dist/platypus.d.ts" />
```

## Recommendations

It is recommended that you use a CommonJS module loader with PlatypusTS in favor of 
using `window.plat`.

## Documentation

Documentation is available on the [Platypi website](https://platypi.io/docs).
