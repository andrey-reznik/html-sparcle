//Наблюдение за файлами проекта
module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch($.config.path.watch.sass.watch, $.gulp.series('sass'));    //Наблюдение за STYL файлами
        $.gulp.watch([$.config.path.watch.pug.all,
            $.config.path.watch.data.data], $.gulp.series('pug'));     //Наблюдение за PUG и JSON файлами с данными
        $.gulp.watch($.config.path.watch.js, $.gulp.series('js:main'));       //Наблюдение за JS файлами
        $.gulp.watch($.config.path.watch.fonts, $.gulp.series('fonts'));     //Наблюдение за файлами шрифтов
        $.gulp.watch($.config.path.watch.img, $.gulp.series('img'));         //Наблюдение за файлами изображений
        $.gulp.watch($.config.path.watch.svg, $.gulp.series('svg'));         //Наблюдение за svg файлами
        $.gulp.watch($.config.path.libs.js, $.gulp.series('js:plugins'));       //Наблюдение за файлом списка JS библиотек
        $.gulp.watch($.config.path.libs.fonts, $.gulp.series('fonts'));      //Наблюдение за файлом списка шрифтов
        $.gulp.watch($.config.smartGrid.config, $.gulp.series('smartgrid')); //Наблюдение за файлом настроек SmartGrid
    });
};