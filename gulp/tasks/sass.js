//Сборка SASS в CSS
module.exports = function (gulp, $, config) {
    return function () {
        return gulp.src(config.path.watch.style)
            .pipe($.sass({
                outputStyle: 'expand'
            })).on('error', $.notify.onError())                               //Сборка SASS в CSS + включение уведомлений в системном трее при ошибке
            .pipe($.autoprefixer(config.autoprefixer))                        //Добавление CSS свойствам префиксов для браузеров
            .pipe($.groupCssMediaQueries())                                   //Группировка медиа запросов в CSS
            .pipe($.if(config.release, $.cleanCss()))                   //Минификация CSS
            .pipe($.if(config.release,  $.rename({suffix: '.min'})))    //Переименовывание CSS файла
            .pipe(gulp.dest(config.path.app.css))                                   //Перемещение CSS в папку для CSS
            .pipe($.browserSync.reload({stream: true}));                      //Обновление браузера
    };
};