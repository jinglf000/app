// 引入 gulp
var gulp   = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');  // 检查js
var concat = require('gulp-concat'); // 合并文件
var uglify = require('gulp-uglify'); // 压缩文件
var rename = require('gulp-rename');  // 重命名

// 检查js脚本 
gulp.task('jshint',function(){
    gulp.src('./src/js/*.js')  // js 文件路径
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    console.log("js 文件检查结束！");
});

// 找到src下面的所有js文件，合并、重命名、压缩，最后处理完成的js放到dist/js目录下
gulp.task('scripts',function(){
    gulp.src("./src/js/*.js")
        .pipe(concat('all.js'))
        .pipe(gulp.dest('.dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
        console.log('合并、重命名、压缩 执行成功！');//自定义提醒信息
});

// 定义默认
gulp.task('default', function(){
    gulp.run('lint', 'scripts');
    // 监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('./src/js/*.js', function(){
        gulp.run('lint','scripts');
    });
});
