module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    'pug': 'grunt-pug-i18n',
    'configureRewriteRules': 'grunt-connect-rewrite',
    'useminPrepare': 'grunt-usemin',
    'configureProxies': 'grunt-connect-proxy',
    'protractor': 'grunt-protractor-runner',
    'simplemocha': 'grunt-simple-mocha'
  });

  var conf = require('./src/main/server/conf');

  grunt.initConfig({

    checkDependencies: {
        npm: {
          options: {
            packageManager: 'npm'
          }
        },
        bower: {
          options: {
            packageManager: 'bower'
          }
        }
    },

    karma: {
      options: {
        configFile: 'src/test/karma-conf.js'
      },
      unit: {
        background: true,
        singleRun: false
      },
      once: {
        background: false,
        singleRun: true
      }
    },

    ngAnnotate: {
      sources: {
        files: [
          {
            expand: true,
            src: ['src/main/compiled/js/**/*.js']
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },

      dist: {
        src: 'src/main/compiled/styles/**/*.css'
      }

    },

    jshint: {
      options: {
        esversion: 6,
        jshintrc: true
      },
      all: ['src/main/assets/js/**/*.js'],
      tests: ['src/test/js/unit/**/*.js'],
      server: ['src/main/server/**/*.js']
    },

    simplemocha: {
      all: {
        src: ['src/test/server/**/*.js']
      }
    },

    filerev: {
      options: {
          algorithm: 'md5',
          length: 8
      },
      images: {
        src: 'src/main/webapp/server/public/**/*.{jpg,jpeg,gif,png,webp}'
      },
      css: {
        src: 'src/main/webapp/server/public/css/**/*.css'
      },
      js: {
        src: 'src/main/webapp/server/public/js/**/*.js'
      }
    },

    filerev_replace: {
      options: {
        assets_root: 'src/main/webapp/server/public'
      },
      assets: {
        src: 'src/main/webapp/server/public/{css,js}/*.{css,js}'
      },
      html: {
        src: 'src/main/webapp/server/public/**/*.html'
      }
    },

    clean: {
      compiled: ['src/main/compiled', 'src/test/compiled'],
      webapp: ['src/main/webapp/*'],
      database: ['database.sqlite']
    },

    copy: {
      html: {
        files: [
          {
            expand: true, cwd: 'src/main/compiled/templates',
            src: ['**/*.html'],
            dest: 'src/main/webapp/server/public',
            rename: function(dest, src) {
              if (src.indexOf('index.en.html') >= 0) {
                return dest + '/' + src.replace(/\.en\.html$/, ".html");
              } else {
                return dest + '/' + src;
              }
            }
          }
        ]
      },
      images: {
        files: [
          { expand: true, cwd: 'src/main/compiled/images', src: ['**/*.*'], dest: 'src/main/webapp/server/public/images'}
        ]
      },
      fonts: {
        files: [
          { expand: true, cwd: 'src/main/compiled/fonts', src: ['**/*.*'], dest: 'src/main/webapp/server/public/fonts'}
        ]
      },
      locales: {
        files: [
          { expand: true, cwd: 'src/main/assets/locales', src: ['**/*.*'], dest: 'src/main/webapp/server/public/locales' }
        ]
      },
      server: {
        files: [
          { expand: true, cwd: 'src/main/server', src: ['**/*.*'], dest: 'src/main/webapp/server' }
        ]
      }
    },

    useminPrepare: {
        html: 'src/main/compiled/templates/**/index.*.html',
        options: {
            dest: 'src/main/webapp/server/public',
            root: 'src/main/compiled'
        }
    },

    usemin: {
        html: ['src/main/webapp/**/index.html']
    },

    cssmin: {
      options: {
        root: 'app'
      }
    },

    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        server: {
          files: [{
            expand: true,
            cwd: 'src/main/server',
            src: ['**/*.js'],
            dest: 'src/main/compiled/server',
            ext: '.js'
          }]
        },
        tests: {
          files: [{
            expand: true,
            cwd: 'src/test/js',
            src: ['**/unit/*.js'],
            dest: 'src/test/compiled/',
            ext: '.js'
          }]
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'src/main/assets/js',
            src: ['**/*.js'],
            dest: 'src/main/compiled/js',
            ext: '.js'
          }]
        }
    },

    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src/main/assets/styles',
          src: ['**/*.styl'],
          dest: 'src/main/compiled/styles',
          ext: '.css'
        }]
      }
    },

    pug: {
      compile: {
        options: {
          debug: false,
          pretty: true,
          basedir: 'src/main/assets/templates',
          i18n: {
            locales: 'src/main/assets/locales/*.json',
            localeExtension: true
          }
        },
        files: [{
          expand: true,
          cwd: 'src/main/assets/templates',
          src: ['**/*.pug'],
          dest: 'src/main/compiled/templates',
          ext: '.html'
        }]
      }
    },

    htmlmin: {
      templates: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src/main/webapp/server/public',
          src: ['**/*.html'],
          dest: 'src/main/webapp/server/public'
        }]
      }
    },

    modernizr: {
      dist: {
          "crawl": false,
          "customTests": [],
          "dest": "src/main/compiled/js/modernizr.js",
          "tests": [
            "flexbox",
            "flexboxlegacy",
            "flexboxtweener"
          ],
          "options": [
            "setClasses"
          ],
          "uglify": true
      }
    },

    watch: {
      options: {
        livereload: true
      },
      server: {
        files: ['src/main/server/**/*.js'],
        tasks: ['jshint:server'],
        options: {
          livereload: false
        }
      },
      js: {
        files: ['src/main/assets/js/**/*.js'],
        tasks: ['jshint:all', 'newer:babel'],
      },
      css: {
        files: ['src/main/compiled/styles/**/*.css'],
      },
      pug: {
        files: ['src/main/assets/templates/**/*.pug', 'src/main/assets/locales/*.json'],
        tasks: ['newer:pug']
      },
      stylus: {
        files: ['src/main/assets/styles/**/*.styl'],
        tasks: ['stylus', 'postcss'],
        options: {
          livereload: false
        }
      },
      tests: {
        files: ['src/test/js/unit/**/*.js'],
        tasks: ['jshint:tests'],
        options: {
          livereload: false
        }
      }
    },

    symlink: {
      options: {
        overwrite: true,
        force: true
      },

      images: {
        src: 'src/main/assets/images',
        dest: 'src/main/compiled/images'
      },

      locales: {
        src: 'src/main/assets/locales',
        dest: 'src/main/compiled/locales'
      },

      bower: {
        src: 'src/main/bower_components',
        dest: 'src/main/compiled/bower_components'
      },

      fonts: {
        src: 'src/main/assets/fonts',
        dest: 'src/main/compiled/fonts'
      }
    },

    html2js: {
      options: {
        base: 'src/main/webapp/server/public',
        singleModule: true,
        rename: function(name) {
          return '/' + name;
        }
      },
      all: {
        src: ['src/main/webapp/server/public/**/*.html', '!**/index.html'],
        dest: 'src/main/webapp/server/public/js/templates.js'
      },
    },

    nodemon: {
      dev: {
        options: {
          watch: ['src/main/server'],
          delay: 500,
          env: {
            NODE_ENV: conf.name
          }
        },
        script: 'src/main/server/app.js'
      }
    },

    protractor: {
      options: {
        noColor: false,
        configFile: 'src/test/protractor-conf.js'
      },
      e2e: {
        options: {
          keepAlive: false
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['dev-frontend', 'nodemon:dev']
    },

    connect: {
      proxies: [{
        context: [
          "!/api/i18n",
          "/api/"
        ],
        host: conf.host,
        port: conf.port,
        headers: {
            "host": conf.host,
            "accept-encoding": "deflate"
        }
      }],
      rules: [
        {from: '^/$', to: '/templates/index.en.html'},
        {from: '^/(.*)\.html$', to: '/templates/$1\.html'},
        {from: '^/(.*)/$', to: '/templates/$1/index.en.html'},
        {from: '^/api/i18n', to: '/locales/en.json'}
      ],

      http: {
        options: {
          keepalive: false,
          port: conf.frontPort,
          base: 'src/main/compiled',
          livereload: true,
          hostname: '0.0.0.0',

          middleware: function (connect, options, defaultMiddleware) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            var rewrite = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

             return [
                rewrite, proxy
             ].concat(defaultMiddleware);
          }

        }
      }
    }

  });


  var devTasks = function(extra) {
    var tasks = [
      'checkDependencies',
      'symlink:bower',
      'symlink:images',
      'symlink:fonts',
      'symlink:locales',
      'jshint',
      'babel',
      'modernizr',
      'stylus',
      'postcss',
      'pug',
      'configureProxies',
      'configureRewriteRules'
    ];
    return tasks.concat(extra);
  };

  var server;
  grunt.registerTask('server', function (target) {
    server = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon:dev'
    });
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
  });
  grunt.registerTask('server:stop', function (target) {
    server.kill('SIGINT');
  });

  grunt.registerTask('dev-frontend', devTasks(['connect:http', 'watch']));
  grunt.registerTask('test-frontend', devTasks(['connect:http']));

  grunt.registerTask('dev', ['concurrent:dev']);
  grunt.registerTask('test:unit', devTasks(['karma:once']));
  grunt.registerTask('test:e2e', ['clean:database', 'server', 'test-frontend', 'protractor:e2e', 'server:stop']);
  grunt.registerTask('test:server', ['clean:database', 'simplemocha']);

  grunt.registerTask('build', [
    'clean',
    'checkDependencies',
    'copy:server',
    'symlink:bower',
    'symlink:images',
    'symlink:fonts',
    'symlink:locales',
    'babel',
    'modernizr',
    'ngAnnotate',
    'stylus',
    'postcss',
    'pug',
    'copy:html', 'copy:images', 'copy:fonts', 'copy:locales',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin:html',
    'htmlmin:templates',
    'html2js:all',
    'filerev',
    'filerev_replace'
  ]);

};
