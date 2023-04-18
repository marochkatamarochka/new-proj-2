const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const libs = [ 'node_modules/jquery/dist/jquery.js', 'src/scripts/*.js' ];
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
    return src('${DIST_PATH}/**/*', { read: false }).pipe(rm());
 });
 task("copy:html", () => {
    return src('${SRC_PATH}/*.html').pipe(dest({DIST_PATH})).pipe(reload({ stream: true }));
});
task("copy", () => {
    return src('src/*.scss').pipe(dest({DIST_PATH})).pipe(reload({ stream: true }));
});



task('scripts', () => {
    return src([...JS_LIBS, "src/scripts/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("main.js", {newLine: ';'}))
    .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
});

task('icons', () => {
    return src('src/images/icons/*.svg')
      .pipe(svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: '(fill|stroke|style|width|height|data.*)'
            }
          }
        ]
      }))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg'
          }
        }
      }))
      .pipe(dest('dist/img/icons'));
   });

task("styles", () => {

    return src([...STYLES_LIBS,"src/styles/components/main.scss"])
    .pipe(gulp(env === "dev", sourcemaps.init()))

    .pipe(concat("main.scss"))
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === 'dev,'
        autoprefixer({
        cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest("dist"));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});
task('watch', () => {
watch('./src/img/*.svg', series('icons'));
watch('./src/scripts/*.js', series('scripts'));
watch('./src/styles/**/*.scss', series("styles"));
watch('./src/*.html', series("copy:html"));
});
task('default',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons'),
   parallel('watch', 'server')
 )
);

task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons')
 )
);