[![npm version](https://badge.fury.io/js/platypus.svg)](http://badge.fury.io/js/platypus)
[![Downloads](http://img.shields.io/npm/dm/platypus.svg)](https://npmjs.org/package/platypus)
[![Dependency Status](https://david-dm.org/Platypi/platypusts.svg)](https://david-dm.org/Platypi/platypusts)
[![devDependency Status](https://david-dm.org/Platypi/platypusts/dev-status.svg)](https://david-dm.org/Platypi/platypusts#info=devDependencies)

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
using TypeScript >= 1.6.0 everything will be handled for you. Otherwise you can use one of the following
methods.

### with Typings

```shell
typings install --save npm:platypus
```

### without Typings

Reference `/node_modules/platypus/dist/platypus.d.ts` from your `tsconfig.json`

## Recommendations

It is recommended that you use a CommonJS module loader with PlatypusTS in favor of
using `window.plat`.

## Documentation

Documentation is available on the [Platypi Developers Website](https://developers.platypi.io).
