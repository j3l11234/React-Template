var gulp = require('gulp');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var headerfooter = require('gulp-headerfooter');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');

var proxy = require('proxy-middleware');
var url = require('url');
var browserSync = require('browser-sync').create();

var DIST = './dist';


gulp.task('clean', function() {
  return gulp.src(['dist/'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function() {
  gulp.start('html', 'style', 'webpack', 'other');
});

gulp.task('dev', ['clean'], function() {
  gulp.start('html', 'style', 'other');
  gulp.start('webpack-watch', 'watch');
  gulp.start('server');
});

//========= build procedure =========
gulp.task('html', function() {
  gulp.src(['./src/pages/**/*.html', '!./src/pages/partials/*.html'])
    .pipe(headerfooter.header('./src/pages/partials/header.html'))
    .pipe(headerfooter.footer('./src/pages/partials/footer.html'))
    .pipe(gulp.dest(DIST));
});

gulp.task('style', function() {
  let stream = gulp.src('./src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
  
  if (process.env.NODE_ENV === 'production') {
    stream = stream.pipe(gulp.dest(DIST + '/css'))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
  }

  stream.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/css'));
});

gulp.task('webpack', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(webpack(require('./webpack.config.js'), require('webpack')))
    .pipe(gulp.dest(DIST + '/js'));
});

gulp.task('other', function() {
  // If your project need jQuery, you can uncomment this
  // gulp.src([
  //   './node_modules/jquery/dist/jquery?(.min).js',
  // ]).pipe(gulp.dest(DIST + '/js'));

  gulp.src(['./src/!(js|pages|scss)'])
    .pipe(gulp.dest('./dist/'));

  // You can add your custom procedure here
});


//========= watch =========
gulp.task('watch', function() {
  gulp.watch(['./src/scss/**/*.scss'], ['style']);
  gulp.watch(['./src/pages/**/*.html'], ['html']);
  gulp.watch(['./src/!(js|pages|scss)'], ['other']);
});

gulp.task('webpack-watch', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(webpack(Object.assign(
      require('./webpack.config.js'),
      { watch: true }
    ), require('webpack')))
    .pipe(gulp.dest(DIST + '/js'));
});


//========= server =========
gulp.task('server', function() {
  // var proxyOptions = url.parse('http://localhost:4000/api/');
  // proxyOptions.route = '/api';

  browserSync.init({
    //logPrefix: 'Project',
    port: 3000,
    server: {
      baseDir: [
        './dist',
      ],
      middleware: [
        //proxy(proxyOptions)
      ]
    },
  });
  gulp.watch([DIST + "/**/*"]).on('change', browserSync.reload);
});
