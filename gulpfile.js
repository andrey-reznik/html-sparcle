var config = require('./gulp/config.json');
global.$ = {
    config: config,
    fs: require('fs'),
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(config.loadPludins)
};

$.config.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.parallel('sass', 'pug', 'js:app', 'js:libs', 'fonts', 'img', 'svg'));//Таски для первоначальной сборки (во время разработки или перед сборкой)
$.gulp.task('default', $.gulp.series('dev', $.gulp.parallel('watch', 'serve')));        //Таск по умолчанию
$.gulp.task('build', $.gulp.series('clear:dist', 'dev', 'dist'));                       //Сборка проекта