const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const connect = require('gulp-connect');


//复制html页面
gulp.task('copyhtml',function() {
    return gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'))
    .pipe(connect.reload());
});

//复制并压缩css文件
gulp.task('copycss',function() {
    return gulp.src('./src/style/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./dist/style'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))//统一对于压缩文件添加min
    .pipe(gulp.dest('./dist/style'))
    .pipe(connect.reload());
});
//复制并压缩lib中的js文件

gulp.task('copylibjs',function() {
    return gulp.src('./src/js/lib/*.js')
    .pipe(gulp.dest('./dist/js/lib'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))//统一对于压缩文件添加min
    .pipe(gulp.dest('./dist/js/lib'))
    .pipe(connect.reload());
});

//复制并压缩js文件
gulp.task('copyjs',function() {
    return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))//统一对于压缩文件添加min
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

//复制data数据
gulp.task('copyjson',function() {
    return gulp.src('./src/js/*.json')
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

//复制图片
gulp.task('copyimg',function() {
    return gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(connect.reload());
});

//复制后端接口

gulp.task('copyinterface',function() {
    return gulp.src('./interface/*.php')
    .pipe(gulp.dest('./dist/interface'))
    .pipe(connect.reload());
});
//事件监听
gulp.task('watch', function() {
    // 监听所有的less文件
    // 如果有修改 就执行 less 这个 task
    gulp.watch('./src/html/*.html', gulp.series('copyhtml'));
    gulp.watch('./src/style/*.scss', gulp.series('copycss'));
    gulp.watch('./src/js/*.js', gulp.series('copyjs'));
    gulp.watch('./src/js/lib/*.js', gulp.series('copylibjs'));
    gulp.watch('./src/js/*.json', gulp.series('copyjson'));
    gulp.watch('./src/img/*', gulp.series('copyimg'));
    gulp.watch('./interface/*.php',gulp.series('copyinterface'));
});


//启动临时服务器
gulp.task('server',function() {
    connect.server({
        root:"dist",
        port:1017,//接口随便写
        livereload:true
    });
});


gulp.task("default",gulp.parallel("watch",'server'));