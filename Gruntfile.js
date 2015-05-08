/*
 * grunt-iniscan
 * https://github.com/juliangut/grunt-iniscan
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

module.exports = function(grunt) {

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
      custon_attributes: {
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

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.registerTask('default', ['jshint', 'clean', 'mkdir', 'iniscan']);

};
