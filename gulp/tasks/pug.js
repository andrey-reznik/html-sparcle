//Сборка PUG в HTML
module.exports = function () {
    $.gulp.task('pug', function () {
        return $.gulp.src($.config.path.watch.pug.pages)
            .pipe($.gp.pug({
                pretty: true,
                locals: {
                    nav: JSON.parse($.fs.readFileSync($.config.path.pug.navigation, 'utf-8')),  //Чтение файла навигации
                    content: JSON.parse($.fs.readFileSync($.config.path.pug.content, 'utf-8')), //Чтение файла с контентом
                    release: $.config.release                                                   //Релиз или разработка
                }
            }).on('error', $.gp.notify.onError()))
            .pipe($.gulp.dest($.config.path.app.html))                                          //Помещение скомпилированных HTML файлов в папку app
            .on('end', $.gp.browserSync.reload);                                                //Обновление браузера после завершения таска
    });
};