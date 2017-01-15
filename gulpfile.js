const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('gulp-browserify');
const babel      = require('gulp-babel');
const concat     = require('gulp-concat');
const $          = require("gulp-load-plugins")();

global.path = {
    //proxy: "local.dev/my/server/lol",
    server: './',
    scss: "css/",
    img: "img/",
    js: "./js/",
    css: "css/",
    refresh: ["**/*.html", "**/*.php", "js/*.js"]
};

// Support
global.browser_support = [
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];

/**
 * SCRIPT JS
 */
gulp.task('script', () => {
    return gulp.src('js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write(path.js))
        .pipe(gulp.dest('./dist'));
});

/**
 * SCSS
 */
gulp.task('sass', () => {
    gulp.src(path.scss + "*.scss")
        .pipe($.sass({
            onError: console.error.bind(console, 'SASS Error:')
        }))
        .pipe($.autoprefixer({
            browsers: browser_support
        }))
        .pipe(gulp.dest(path.css))
        .pipe($.size())
});

/**
 * Travis build
 */
gulp.task('build', ['sass', 'script'], () => {

});

gulp.task('default', () => {
    gulp.watch(path.scss + '**/*scss', ['sass']);
    gulp.watch('./js/**/*.js', ['script']);
});