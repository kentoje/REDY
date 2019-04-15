const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const pxtorem = require('gulp-pxtorem');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const prod = process.env.NODE_ENV === 'prod';
const server = browserSync.create();

function html() {
  return src('src/index.html')
    .pipe(gulpif(prod, htmlmin({ collapseWhitespace: true })))
      .pipe(dest('dist'));
}

function fonts() {
  return src('src/fonts/**/*')
      .pipe(dest('dist/fonts'));
}

function pages() {
  return src('src/pages/**/*')
    .pipe(gulpif(prod, htmlmin({ collapseWhitespace: true })))
      .pipe(dest('dist/pages'))
}

function css() {
  return src('src/scss/style.scss')
    .pipe(sass())
      .pipe(pxtorem())
        .pipe(gulpif(prod, cssnano()))
          .pipe(gulpif(prod, autoprefixer({ browsers: ['last 2 versions'], cascade: false })))
            .pipe(dest('dist/css'));
}

function js() {
  return src('src/js/**/*')
    .pipe(minify())
      .pipe(dest('dist/js'));
}

function images() {
  return src('src/img/**/*')
    .pipe(gulpif(prod, imagemin()))
    .pipe(dest('dist/img'));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
}

exports.dev = series(parallel(html, css, js, images, fonts, pages), serve, () =>
  watch((['./src/index.html', './src/pages/**/*.html', './src/scss/**/*.scss', './src/js/**/*.js']), series(parallel(html, css, js, images, fonts, pages), reload))
);
exports.build = series(html, css, js, images, fonts, pages);