/*
 * grunt-iniscan
 * https://github.com/juliangut/grunt-iniscan
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

var path = require('path');
var exec = require('child_process').exec;

module.exports = function(grunt) {

  var attributes = {
    path: 'path',
    threshold: 'threshold',
    format: 'format',
    context: 'context',
    php: 'php',
    output: 'output'
  };
  var flags = {
    failOnly: 'fail-only'
  };

  grunt.registerMultiTask('iniscan', 'Grunt php.ini file scanner', function() {
    var cmd = null;
    var done = null;

    var config = this.options({
      bin: 'iniscan',
      format: 'console'
    });

    if (config.path !== undefined && !grunt.file.exists(config.path)) {
      grunt.verbose.error();
      grunt.log.warn('Source file ' + config.path + ' not found.');

      return false;
    }

    if (config.threshold !== undefined) {
      config.threshold = config.threshold.replace(/^\s+|\s+$/g, '').toUpperCase();

      if (!['WARNING', 'ERROR', 'FATAL'].indexOf(config.threshold)) {
        grunt.verbose.error();
        grunt.fail.warn('Threshold level ' + config.threshold + ' is not valid.');

        return false;
      }
    }

    if (config.php !== undefined && !/^[0-9]+((\.[0-9]+)?\.[0-9]+)?$/.test(config.php)) {
      grunt.verbose.error();
      grunt.fail.warn('PHP version ' + config.php + ' is not valid.');

      return false;
    }

    config.format = config.format.replace(/^\s+|\s+$/g, '').toLowerCase();

    if (['console', 'html', 'json', 'xml'].indexOf(config.format) === -1) {
      grunt.verbose.error();
      grunt.fail.warn('Format ' + config.format + ' is not supported.');

      return false;
    }

    if (config.output !== undefined) {
      config.output = path.normalize(config.output).replace(/\\$/, '');

      if (!grunt.file.exists(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Output directory ' + config.output + ' not found.');

        return false;
      }
      if (!grunt.file.isPathInCwd(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Cannot output to a directory outside the current working directory.');

        return false;
      }
    }

    cmd = path.normalize(config.bin) + ' scan';

    for (var attribute in attributes) {
      if (config[attribute] !== undefined) {
        cmd += ' --' + attributes[attribute] + '=' + config[attribute];
      }
    }

    for (var flag in flags) {
      if (config[flag] !== undefined) {
        cmd += ' --' + flags[flag];
      }
    }

    grunt.log.writeln('Starting iniscan (target: ' + this.target.cyan + ')');
    grunt.verbose.writeln('Execute: ' + cmd);

    done = this.async();

    return exec(cmd, function(err, stdout) {
      if (/^Error: Command failed: .+ No such file or directory\n$/g.test(err)) {
        grunt.fatal(err);
      }

      if (config.output === undefined) {
        grunt.log.write(stdout);
      } else {
        var outputFile = config.output + '/iniscan-output' + (config.format !== 'console' ? '.' + config.format : '');

        if (config.format === 'html') {
          var files = grunt.file.expand({ filter: 'isFile', cwd: config.output }, ['iniscan-output-+([0-9]).html']);
          var generatedFile = config.output + '/' + files[files.length -1];

          stdout = grunt.file.read(generatedFile);
          grunt.file.delete(generatedFile);
        }

        grunt.file.write(outputFile, stdout);
        grunt.log.warn('Generating output file ' + outputFile);
      }

      return done();
    });
  });

};
