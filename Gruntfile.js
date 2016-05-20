/*
 * grunt-iniscan
 * https://github.com/juliangut/grunt-iniscan
 *
 * Copyright (c) 2016 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.loadTasks('tasks');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      application: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },

    clean: {
      tests: ['tmp']
    },

    mkdir: {
      tests: {
        options: {
          create: ['tmp']
        }
      }
    },

    iniscan: {
      options: {
        bin: './vendor/bin/iniscan'
      },
      custom_file: {
        options: {
          path: './test/php.ini'
        }
      },
      custom_attributes: {
        options: {
          path: './test/php.ini',
          threshold: 'ERROR',
          format: 'xml',
          context: 'dev',
          php: '5.2.0',
          output: './tmp',
          failOnly: true
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'mkdir', 'iniscan']);
};
