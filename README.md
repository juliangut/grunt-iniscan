[![Latest Version](https://img.shields.io/npm/v/grunt-iniscan.svg?style=flat-square)](https://npmjs.org/package/grunt-iniscan)
[![License](https://img.shields.io/github/license/juliangut/grunt-iniscan.svg?style=flat-square)](https://github.com/juliangut/grunt-iniscan/blob/master/LICENSE)

[![Total Downloads](https://img.shields.io/npm/dt/grunt-iniscan.svg?style=flat-square)](https://npmjs.org/package/grunt-iniscan)
[![Monthly Downloads](https://img.shields.io/npm/dm/grunt-iniscan.svg?style=flat-square)](https://npmjs.org/package/grunt-iniscan)

# iniscan Grunt plugin

> Grunt plugin for running [iniscan](https://github.com/psecio/iniscan)

## Getting Started
This plugin requires Grunt `^0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iniscan --save-dev
```

Make sure you have iniscan installed

```shell
composer require psecio/iniscan
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iniscan');
```

## The "iniscan" task

### Overview
In your project's Gruntfile, add a section named `iniscan` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  iniscan: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bin
Type: `String`
Default value: `'iniscan'`

iniscan executable binary.

In case you do not provide iniscan binary path you need to have it on PATH environment variable otherwise plugin will raise an error

#### options.path
Type: `String`
Default value: `undefined`

Path to custom php.ini. If not provided then php-cli loaded php.ini file will be used.

#### options.threshold
Type: `String`
Default value: `WARNING`

Minimum rule threshold to scan upon. One of `WARNING`, `ERROR` or `FATAL`

#### options.format
Type: `String`
Default value: `'console'`

Output report format. One of `console`, `html`, `json` or `xml`

#### options.context
Type: `String`
Default value: `'prod'`

Context to scan rules against, rules out of the specified context won't be checked.

#### options.php
Type: `String`
Default value: `undefined`

PHP version to scan upon. If none provided current php-cli `PHP_VERSION`is used.

#### options.output
Type: `String`
Default value: `undefined`

Output path to save iniscan reports.

Output file name will be iniscan-output{.format} except for `console` format which won't have extension

### Usage Example

```js
grunt.initConfig({
  iniscan: {
    all {
      options: {
        threshold: 'ERROR',
        format: 'json',
        failOnly: true
      }
    }
  },
});
```

## Contributing

Found a bug or have a feature request? [Please open a new issue](https://github.com/juliangut/grunt-iniscan/issues). Have a look at existing issues before.

See file [CONTRIBUTING.md](https://github.com/juliangut/grunt-iniscan/blob/master/CONTRIBUTING.md)

## License

See file [LICENSE](https://github.com/juliangut/grunt-iniscan/blob/master/LICENSE) included with the source code for a copy of the license terms.
