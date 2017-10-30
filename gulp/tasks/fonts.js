//Сборка шрифтов
module.exports = function () {
    $.gulp.task('fonts', function () {
        return $.gulp.src($.gp.requireReload($.config.gulpRoot + $.config.path.libs.fonts).src)
            .pipe($.gulp.dest($.config.path.app.fonts))             //Перемещение файлов шрифтов в папку fonts
            .on('end', $.gp.browserSync.reload);                    //Обновление браузера после завершения таска
    });
};