var gulp = require("gulp");
var sass = require("gulp-sass");
var compass = require("gulp-compass");
var csso = require("gulp-csso");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var csscomb = require("gulp-csscomb");
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var del = require('del');
var changed = require('gulp-changed');

gulp.task("server", function() {
    browser.init({
        //変更
        proxy: "http://localhost:8888/cakephp_3/app/"
    });
    browser({
        // notify: false,
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("img", function(){
  gulp.src("webroot/origin_img/*")
    .pipe(changed("webroot/img"))
    .pipe(imagemin())
    .pipe(gulp.dest("webroot/img"));
});
 
gulp.task("sass", function() {
    //過去リビジョンファイル削除
    del(['webroot/css_rev/*']);
    gulp.src("webroot/scss/*scss")
        .pipe(plumber())
        .pipe(changed("webroot/css_rev"))
        // .pipe(sass())
        .pipe(compass({
            config_file: 'webroot/config.rb',
            css: 'webroot/css',
            sass: 'webroot/scss'
        }))
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(csso())
        .pipe(gulp.dest("webroot/css"))
        .pipe(rev())
        .pipe(gulp.dest("webroot/css_rev"))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(""))
        .pipe(browser.reload({stream:true}));
});

gulp.task("js", function() {
    //過去リビジョンファイル削除
    del(['webroot/js/rev/*']);
    gulp.src(["webroot/js/*.js"])
        .pipe(plumber())
        .pipe(changed("webroot/js/rev"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("webroot/js/rev"))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(""))
        .pipe(browser.reload({stream:true}));
});


gulp.task("default",['server'], function() {
    gulp.watch(["webroot/js/**/*.js","!webroot/js/min/**/*.js"],["js"]);
    gulp.watch("webroot/scss/**/*.scss",["sass"]);
    gulp.watch("webroot/origin_img/*",["img"]);
});
