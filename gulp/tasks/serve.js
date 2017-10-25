//Автообновления браузера при изменении файлов
module.exports = function () {
    $.gulp.task('serve', function () {
        $.gp.browserSync.init({
            server: {
                baseDir: $.config.path.app.html               //Папка локального сервера для проекта
            },
            notify: $.config.browserSync.notify,              //Миниуведомления в браузере
            tunnel: $.config.browserSync.tunnel               //Туннелирование сайта на localtunnel.me
        });
    });
};