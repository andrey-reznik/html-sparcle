//Автообновления браузера при изменении файлов
module.exports = function (gulp, plugins, config) {
    return function () {
        plugins.browserSync.init({
            server: {
                baseDir: config.path.app.html               //Папка локального сервера для проекта
            },
            notify: config.browserSync.notify,              //Миниуведомления в браузере
            tunnel: config.browserSync.tunnel               //Туннелирование сайта на localtunnel.me
        });
        gulp.watch(config.path.watch.style, ['sass']);      //Наблюдение за SASS файлами
        gulp.watch([config.path.watch.pug.all,
                config.path.watch.data.content,
                config.path.watch.data.navigation],
                     ['pug']);                              //Наблюдение за PUG и JSON файлами с данными
        gulp.watch(config.path.watch.js, ['js:app']);       //Наблюдение за JS файлами
        gulp.watch(config.path.watch.fonts, ['fonts']);     //Наблюдение за файлами шрифтов
        gulp.watch(config.path.watch.img, ['img']);         //Наблюдение за файлами изображений
    };
};