//Сборка SASS в CSS
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.path.watch.style)
            .pipe(plugins.sass({
                outputStyle: 'expand'
            })).on('error', plugins.notify.onError())                               //Сборка SASS в CSS + включение уведомлений в системном трее при ошибке
            .pipe(plugins.autoprefixer(config.autoprefixer))                        //Добавление CSS свойствам префиксов для браузеров
            .pipe(plugins.groupCssMediaQueries())                                   //Группировка медиа запросов в CSS
            .pipe(plugins.if(config.release, plugins.cleanCss()))                   //Минификация CSS
            .pipe(plugins.if(config.release,  plugins.rename({suffix: '.min'})))    //Переименовывание CSS файла
            .pipe(gulp.dest(config.path.app.css))                                   //Перемещение CSS в папку для CSS
            .pipe(plugins.browserSync.reload({stream: true}));                      //Обновление браузера
    };
};